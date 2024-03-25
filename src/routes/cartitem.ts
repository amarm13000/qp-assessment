import { Router } from "express";
const router = Router();
import CartItemController from "../controllers/CartItem";

router.post("/cartitem", CartItemController.create);

router.get("/cartitem", CartItemController.getAll);

router.patch("/cartitem", CartItemController.update);

router.delete("/cartitem", CartItemController.delete);

router.delete("/cartitem/confirm", CartItemController.confirmCartAndCreateOrder);

export default router;
