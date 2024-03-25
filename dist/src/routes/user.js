"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const User_1 = __importDefault(require("../controllers/User"));
router.post("/user", User_1.default.create);
router.get("/user", User_1.default.getAll);
router.get("/user/:id", User_1.default.get);
router.patch("/user/:id", User_1.default.update);
router.delete("/user/:id", User_1.default.delete);
exports.default = router;
