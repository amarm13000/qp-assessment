import HTTPController from "./HttpController";
import db from "../../models";
import { Request, Response, NextFunction } from "express";
import { hashPassword, verifyPassword } from "../helpers/password";
import { HTTPForbidden, HTTPUnauthorized } from "../exceptions";
import { generateToken } from "../helpers/token";

class AuthController {
  register = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      let [user, { id: userRoleId }] = await Promise.all([
        db.User.findOne({ where:{username} }),
        db.Role.findOne({ where: { type: "user" }, attributes: ["id"] }),
      ]);
      if (user) {
        throw new HTTPForbidden("Username already exist");
      }
      const hashedPassword = hashPassword(password);

      user = await db.User.create({
        username,
        password: hashedPassword,
        RoleId: userRoleId,
      });
      res.status(200).json({ id: user.id, success: true });
      return res.end();
    } catch (err) {
      next(err);
    }
  };
  login = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const { username, password } = req.body;
      const user = await db.User.findOne({ where: { username } });
      if (!user) {
        throw new HTTPUnauthorized("User does not exist");
      }
      if (!verifyPassword(password, user.password as string)) {
        throw new HTTPUnauthorized("Invalid credentials.");
      }
      const token = generateToken({ userId: user.id, roleId: user.RoleId });
      res.status(200).json({ token });
      return res.end();
    } catch (err) {
      next(err);
    }
  };
}

export default new AuthController();
