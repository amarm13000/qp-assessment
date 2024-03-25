"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const CartItem_1 = __importDefault(require("../controllers/CartItem"));
router.post("/cartitem", CartItem_1.default.create);
router.get("/cartitem", CartItem_1.default.getAll);
router.patch("/cartitem", CartItem_1.default.update);
router.delete("/cartitem", CartItem_1.default.delete);
router.delete("/cartitem/confirm", CartItem_1.default.confirmCartAndCreateOrder);
exports.default = router;
