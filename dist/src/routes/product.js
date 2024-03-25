"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Product_1 = __importDefault(require("../controllers/Product"));
router.post("/product", Product_1.default.create);
router.get("/product", Product_1.default.getAll);
router.get("/product/:id", Product_1.default.get);
router.patch("/product/:id", Product_1.default.update);
router.delete("/product/:id", Product_1.default.delete);
exports.default = router;
