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
class Order extends HttpController_1.default {
    constructor(model) {
        super(model);
        //Comment:get all order of user
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const order = yield this.model.findAll({ where: { UserId: userId }, attributes: ['id', 'UserId'] });
                this.response(res, order);
            }
            catch (err) {
                next(err);
            }
        });
        //Comment:get order with details
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { userId } = req.user;
                const order = yield this.model.findOne({
                    where: { UserId: userId, id: req.params.id },
                });
                //check whether the order exits
                if (!order) {
                    throw new exceptions_1.HTTPBadRequest("No such order exits for this user");
                }
                const orderList = yield models_1.default.OrderList.findAll({
                    where: { OrderId: order.id },
                    include: {
                        model: models_1.default.Product,
                        attributes: ['name', 'price']
                    }
                });
                this.response(res, orderList);
            }
            catch (err) {
                next(err);
            }
        });
        this.model = model;
    }
}
exports.default = new Order(models_1.default.Order);
