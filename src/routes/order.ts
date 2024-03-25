import { Router } from "express";
const router = Router();
import OrderController from "../controllers/Order";

//get all orders
router.get("/order/", OrderController.getAll);

//get specific order
router.get("/order/:id", OrderController.get);


export default router;
