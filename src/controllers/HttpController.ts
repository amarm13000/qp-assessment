import { NextFunction, Request, Response } from "express";
import { HTTPBadRequest, HTTPInternalServerError } from "../exceptions";

class HTTPController {
  model!: any;
  constructor(model: any) {
    this.model = model;
  }

  //Comment:create resorce with details passed in the request body
  create = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = await this.model.create({
        ...req.body,
      });
      this.response(res, resource);
    } catch (err: any) {
      next(err);
    }
  };

  //Comment:get all resources
  getAll = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const resource = await this.model.findAll({});
      this.response(res, resource);
    } catch (err: any) {
      next(err);
    }
  };

  //Comment:get resorce with resource code
  get = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      const resource = await this.model.findOne({ where: { id } });
      if (!resource) {
        throw new HTTPBadRequest("No such resource exist.");
      }
      this.response(res, resource);
    } catch (err: any) {
      next(err);
    }
  };

  //Comment:update resorce(with code) with details
  update = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      let resource = await this.model.findOne({ where: { id } });
      if (!resource) {
        throw new HTTPBadRequest("No resource exist for patch");
      }
      resource = await resource.update(req.body);
      this.response(res, resource);
    } catch (err: any) {
      next(err);
    }
  };

  //Comment:delete resorce with passed details
  delete = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { id } = req.params;
      let resource = await this.model.findOne({ where: { id } });
      if (!resource) {
        throw new HTTPBadRequest("No resource exist for delete");
      }
      await this.model.destroy({
        where: { code: req.params.id },
      });
      this.response(res, { success: "true" });
    } catch (err: any) {
      next();
    }
  };

  response(res: Response, data: any, status: number = 200) {
    res.status(status).json(data);
    return res.end();
  }
}

export default HTTPController;
