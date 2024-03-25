"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HttpController_1 = __importDefault(require("./HttpController"));
const models_1 = __importDefault(require("../../models"));
class User extends HttpController_1.default {
    constructor(model) {
        super(model);
        this.model = model;
    }
}
exports.default = new User(models_1.default.User);
