import { Router } from "express";
const router = Router();
import ProductController from "../controllers/Product";

router.post("/product", ProductController.create);

router.get("/product", ProductController.getAll);

router.get("/product/:id", ProductController.get);

router.patch("/product/:id", ProductController.update);

router.delete("/product/:id", ProductController.delete);

export default router;
