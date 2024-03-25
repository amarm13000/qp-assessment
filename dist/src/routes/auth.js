"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const router = require('express').Router();
const AuthController_1 = __importDefault(require("../controllers/AuthController"));
router.post('/login', AuthController_1.default.login);
router.post('/register', AuthController_1.default.register);
exports.default = router;
