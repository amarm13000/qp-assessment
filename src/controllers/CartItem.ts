import HTTPController from "./HttpController";
import { NextFunction, Request, Response } from "express";
import db from "../../models";
import { HTTPBadRequest, HTTPError, HTTPForbidden } from "../exceptions";
import cartitem from "../../models/cartitem";

class CartItem extends HTTPController {
  constructor(model: any) {
    super(model);
    this.model = model;
  }

  //expects productId in request body
  create = async (
    req: Request & { user?: { userId: number; roleId: number } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const {
        body: { productId },
      } = req;
      const userId = req.user?.userId;
      const product = await db.Product.findOne({
        where: { id: productId },
      });
      const cartitem = await this.model.findOne({
        where: { ProductId: productId, UserId: userId },
      });
      if (cartitem) {
        throw new HTTPBadRequest(
          "Cart Item already exists. Cannot add this item."
        );
      }

      const newInventory = this.updateInventoryTo(1, 0, product.inventory);
      if (!newInventory) {
        throw new HTTPBadRequest("Item out of stock");
      }
   
      //expecting in request body --user.id, product.id
      const [resource, inventory] = await Promise.all([
        this.model.create({
          UserId: userId,
          ProductId: productId,
        }),
        product.update({ inventory: newInventory }),
      ]);
      
      this.response(res, resource);
    } catch (err: any) {
      next(err);
    }
  };

  //Comment:get all cartitems ie the cart of user with quantity
  getAll = async (
    req: Request & { user?: { userId: number; roleId: number } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user!;
      const resource = await this.model.findAll({
        where: { userId },
        include: { model: db.Product, attributes: ["name"] },
        attributes: ["quantity", "id"],
      });
      this.response(res, resource);
    } catch (err: any) {
      next(err);
    }
  };

  //Comment:update cartitem with quantity
  //expects productId, quantity in request body
  update = async (
    req: Request & { user?: { userId: number; roleId: number } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user!;
      const { productId, quantity } = req.body;

      if (quantity < 1) {
        throw new HTTPBadRequest(
          "Cannot reduce quantity below 1. Use delete endpoint"
        );
      }

      const cartItem = await this.model.findOne({
        where: { UserId: userId, ProductId: productId },
        include: { model: db.Product, attributes: ["inventory"] },
      });

      if (!cartItem) {
        throw new HTTPBadRequest("Cannot patch since cartitem does not exist");
      }

      const updatedInventory = this.updateInventoryTo(
        quantity,
        cartItem.quantity,
        cartItem.Product.inventory
      );
      if (!updatedInventory) {
        throw new HTTPForbidden("Cannot add product out of stock");
      }
      let [inventory, resource] = await Promise.all([
        db.Product.update(
          { inventory: updatedInventory },
          { where: { id: productId } }
        ),
        cartItem.update(
          { quantity },
          { returning: true, attributes: ["quantity", "id"] }
        ),
      ]);
      this.response(res, resource);
    } catch (err: any) {
      next(err);
    }
  };

  //Remove a cartitem with productId and userId
  delete = async (
    req: Request & { user?: { userId: number; roleId: number } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user!;
      const { productId } = req.body;

      const cartItem = await this.model.findOne({
        where: { UserId: userId, ProductId: productId },
        include: { model: db.Product, attributes: ["inventory"] },
      });
      if (!cartItem) {
        throw new HTTPBadRequest(
          "Cannot delete since cart item does not exist"
        );
      }
      const updatedInventory = this.updateInventoryTo(
        0,
        cartItem.quantity,
        cartItem.Product.inventory
      );
     
      await Promise.all([
        db.Product.update(
          { inventory: updatedInventory },
          { where: { id: productId } }
        ),
        this.model.destroy({
          where: { productId, userId },
        }),
      ]);

      this.response(res, { success: "true" });
    } catch (err: any) {
      next(err);
    }
  };

  //Remove a cartitems with userId and create order and order list
  confirmCartAndCreateOrder = async (
    req: Request & { user?: { userId: number; roleId: number } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user!;

      //check whether cartitems exist
      const cartItems = await this.model.findAll({
        where: { UserId: userId },
      });
      if (!cartItems) {
        throw new HTTPBadRequest(
          "Cannot confirm since cart items do not exist"
        );
      }

      /**
       * create order with userId
       * put cartitems in orderlist with  above orderId
       * delete cartitems
       *  */
      const order = await db.Order.create({
        UserId: userId,
      });

      await Promise.all(
        cartItems.map((cartitem: { ProductId: number; quantity: number }) =>
          db.OrderList.create({
            ProductId: cartitem.ProductId,
            quantity: cartitem.quantity,
            OrderId: order.id,
          })
        )
      );
      await this.model.destroy({ where: { UserId: userId } });

      this.response(res, { message: "Order created" });
    } catch (err: any) {
      next(err);
    }
  };

  //TODO:helper function [put in another module]
  /**
   * Helper to return a number by which inventory must be updated . If that is not poissible returns null
   */
  updateInventoryTo(
    newQuantity: number,
    currentQuantity: number,
    currentInventory: number
  ): number | null {
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

export default new CartItem(db.CartItem);
