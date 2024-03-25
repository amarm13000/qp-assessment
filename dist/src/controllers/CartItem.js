"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpController_1 = __importDefault(require("./HttpController"));
const models_1 = __importDefault(require("../../models"));
const exceptions_1 = require("../exceptions");
class CartItem extends HttpController_1.default {
    constructor(model) {
        super(model);
        //expects productId in request body
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            try {
                const { body: { productId }, } = req;
                const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
                const product = yield models_1.default.Product.findOne({
                    where: { id: productId },
                });
                const cartitem = yield this.model.findOne({
                    where: { ProductId: productId, UserId: userId },
                });
                if (cartitem) {
                    throw new exceptions_1.HTTPBadRequest("Cart Item already exists. Cannot add this item.");
                }
                const newInventory = this.updateInventoryTo(1, 0, product.inventory);
                if (!newInventory) {
                    throw new exceptions_1.HTTPBadRequest("Item out of stock");
                }
                //expecting in request body --user.id, product.id
                const [resource, inventory] = yield Promise.all([
                    this.model.create({
                        UserId: userId,
                        ProductId: productId,
                    }),
                    product.update({ inventory: newInventory }),
                ]);
                this.response(res, resource);
            }
            catch (err) {
                next(err);
            }
        });
        //Comment:get all cartitems ie the cart of user with quantity
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const resource = yield this.model.findAll({
                    where: { userId },
                    include: { model: models_1.default.Product, attributes: ["name"] },
                    attributes: ["quantity", "id"],
                });
                this.response(res, resource);
            }
            catch (err) {
                next(err);
            }
        });
        //Comment:update cartitem with quantity
        //expects productId, quantity in request body
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const { productId, quantity } = req.body;
                if (quantity < 1) {
                    throw new exceptions_1.HTTPBadRequest("Cannot reduce quantity below 1. Use delete endpoint");
                }
                const cartItem = yield this.model.findOne({
                    where: { UserId: userId, ProductId: productId },
                    include: { model: models_1.default.Product, attributes: ["inventory"] },
                });
                if (!cartItem) {
                    throw new exceptions_1.HTTPBadRequest("Cannot patch since cartitem does not exist");
                }
                const updatedInventory = this.updateInventoryTo(quantity, cartItem.quantity, cartItem.Product.inventory);
                if (!updatedInventory) {
                    throw new exceptions_1.HTTPForbidden("Cannot add product out of stock");
                }
                let [inventory, resource] = yield Promise.all([
                    models_1.default.Product.update({ inventory: updatedInventory }, { where: { id: productId } }),
                    cartItem.update({ quantity }, { returning: true, attributes: ["quantity", "id"] }),
                ]);
                this.response(res, resource);
            }
            catch (err) {
                next(err);
            }
        });
        //Remove a cartitem with productId and userId
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const { productId } = req.body;
                const cartItem = yield this.model.findOne({
                    where: { UserId: userId, ProductId: productId },
                    include: { model: models_1.default.Product, attributes: ["inventory"] },
                });
                if (!cartItem) {
                    throw new exceptions_1.HTTPBadRequest("Cannot delete since cart item does not exist");
                }
                const updatedInventory = this.updateInventoryTo(0, cartItem.quantity, cartItem.Product.inventory);
                yield Promise.all([
                    models_1.default.Product.update({ inventory: updatedInventory }, { where: { id: productId } }),
                    this.model.destroy({
                        where: { productId, userId },
                    }),
                ]);
                this.response(res, { success: "true" });
            }
            catch (err) {
                next(err);
            }
        });
        //Remove a cartitems with userId and create order and order list
        this.confirmCartAndCreateOrder = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                //check whether cartitems exist
                const cartItems = yield this.model.findAll({
                    where: { UserId: userId },
                });
                if (!cartItems) {
                    throw new exceptions_1.HTTPBadRequest("Cannot confirm since cart items do not exist");
                }
                /**
                 * create order with userId
                 * put cartitems in orderlist with  above orderId
                 * delete cartitems
                 *  */
                const order = yield models_1.default.Order.create({
                    UserId: userId,
                });
                yield Promise.all(cartItems.map((cartitem) => models_1.default.OrderList.create({
                    ProductId: cartitem.ProductId,
                    quantity: cartitem.quantity,
                    OrderId: order.id,
                })));
                yield this.model.destroy({ where: { UserId: userId } });
                this.response(res, { message: "Order created" });
            }
            catch (err) {
                next(err);
            }
        });
        this.model = model;
    }
    //TODO:helper function [put in another module]
    /**
     * Helper to return a number by which inventory must be updated . If that is not poissible returns null
     */
    updateInventoryTo(newQuantity, currentQuantity, currentInventory) {
        const netQuantity = newQuantity - currentQuantity;
        //quantity added requested, check if this amoount is greater than currentInventory
        if (netQuantity > 0 && currentInventory >= netQuantity) {
            return currentInventory - netQuantity;
        }
        //quantity added requested, check if this amoount is greater than currentInventory
        if (netQuantity > 0 && currentInventory < netQuantity) {
            return null;
        }
        //quantity subtract requested, add to the currentInventory
        return currentInventory - netQuantity;
    }
}
exports.default = new CartItem(models_1.default.CartItem);
