"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const HTTPError_1 = __importDefault(require("./HTTPError"));
class HTTPBadRequest extends HTTPError_1.default {
    constructor(message = "Bad Request") {
        super(400, message);
    }
}
exports.default = HTTPBadRequest;
