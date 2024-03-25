"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HTTPForbidden = exports.HTTPBadRequest = exports.HTTPInternalServerError = exports.HTTPUnauthorized = exports.HTTPError = void 0;
const HTTPError_1 = __importDefault(require("./HTTPError"));
exports.HTTPError = HTTPError_1.default;
const HTTPInternalServerError_1 = __importDefault(require("./HTTPInternalServerError"));
exports.HTTPInternalServerError = HTTPInternalServerError_1.default;
const HTTPUnauthorized_1 = __importDefault(require("./HTTPUnauthorized"));
exports.HTTPUnauthorized = HTTPUnauthorized_1.default;
const HTTPBadRequest_1 = __importDefault(require("./HTTPBadRequest"));
exports.HTTPBadRequest = HTTPBadRequest_1.default;
const HTTPForbidden_1 = __importDefault(require("./HTTPForbidden"));
exports.HTTPForbidden = HTTPForbidden_1.default;
