import user from "./user";
import product from "./product";
import cartitem from "./cartitem";
import order from "./order";
import auth from "./auth";
import { Authtorization } from "../middlewares/auth";
import { config } from "dotenv";
config();
import { Express, NextFunction, Request, Response } from "express";
import { HTTPError } from "../exceptions";

const intiateRoutes = (app: Express): void => {
  app.use(process.env.APPLICATION_BASE as string, auth);
  app.use(process.env.APPLICATION_BASE as string, Authtorization);
  app.use(process.env.APPLICATION_BASE as string, user);
  app.use(process.env.APPLICATION_BASE as string, product);
  app.use(process.env.APPLICATION_BASE as string, cartitem);
  app.use(process.env.APPLICATION_BASE as string, order);
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err.stack);
    // Comment: add custom error handling here
    if (err instanceof HTTPError)
      return res.status(err.status).send({ messsage: err.message });
    return res
      .status(500)
      .send({ messsage: "Internal server error. Something wrong." });
  });
};

export default intiateRoutes;
