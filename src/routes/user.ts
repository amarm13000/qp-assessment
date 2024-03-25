import { Router } from "express";
const router = Router();

import UserController from "../controllers/User";

router.post("/user", UserController.create);

router.get("/user", UserController.getAll);

router.get("/user/:id", UserController.get);

router.patch("/user/:id", UserController.update);

router.delete("/user/:id", UserController.delete);

export default router;
