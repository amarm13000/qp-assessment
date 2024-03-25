import { HTTPUnauthorized } from "../exceptions";
import db from "../../models";
import { config } from "dotenv";
config();
import { Request, Response, NextFunction } from "express";
import { validateToken } from "../helpers/token";

export const Authtorization = async (
  req: Request & { user?: { userId: number; roleId: number } },
  res: Response,
  next: NextFunction
) => {
  try {
    
    const token = validateToken(req.headers.at as string) as {userId:number, roleId:number};
    req.user = {
      userId: token.userId!,
      roleId: token.roleId!,
    };

    const {
      url,
      method,
      user: { roleId },
    } = req;
    const resource = url.split("?")[0].split("/")[1];

    const { id: actionId } = await db.Action.findOne({
      where: { type: method },
      attributes: ["id"],
    });
    const { id: resourceId } = await db.Resource.findOne({
      where: { name: resource },
      attributes: ["id"],
    });

    const persmissionExists = await db.Role.findOne({
      include: [
        {
          model: db.Operation,
          where: { enabled: true, actionId, resourceId },
        },
      ],
      where: { id: roleId },
    });

    if (!persmissionExists) {
      next(new HTTPUnauthorized());
    }
    return next();
  } catch (err) {
    next(err);
  }
};

