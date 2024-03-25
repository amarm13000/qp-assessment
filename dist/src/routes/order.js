"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const Order_1 = __importDefault(require("../controllers/Order"));
//get all orders
router.get("/order/", Order_1.default.getAll);
//get specific order
router.get("/order/:id", Order_1.default.get);
exports.default = router;
