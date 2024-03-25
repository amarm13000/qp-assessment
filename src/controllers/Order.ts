import HTTPController from "./HttpController";
import db from "../../models";
import { Request, Response, NextFunction } from "express";
import { HTTPBadRequest } from "../exceptions";

class Order extends HTTPController {
  constructor(model: any) {
    super(model);
    this.model = model;
  }

  //Comment:get all order of user
  getAll = async (
    req: Request & { user?: { userId: number; roleId: number } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user!;
      const order = await this.model.findAll({ where: { UserId: userId }, attributes:['id','UserId'] });
      this.response(res, order);
    } catch (err: any) {
      next(err);
    }
  };

  //Comment:get order with details
  get = async (
    req: Request & { user?: { userId: number; roleId: number } },
    res: Response,
    next: NextFunction
  ) => {
    try {
      const { userId } = req.user!;
      const order = await this.model.findOne({
        where: { UserId: userId, id: req.params.id },
      });
      //check whether the order exits
      if (!order) {
        throw new HTTPBadRequest("No such order exits for this user");
      }
      const orderList = await db.OrderList.findAll({
        where: { OrderId: order.id },
        include:{
            model: db.Product,
            attributes:['name','price']
        }
      });
      this.response(res, orderList);
    } catch (err: any) {
      next(err);
    }
  };
}

export default new Order(db.Order);
