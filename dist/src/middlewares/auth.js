"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Authtorization = void 0;
const exceptions_1 = require("../exceptions");
const models_1 = __importDefault(require("../../models"));
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const token_1 = require("../helpers/token");
const Authtorization = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const token = (0, token_1.validateToken)(req.headers.at);
        req.user = {
            userId: token.userId,
            roleId: token.roleId,
        };
        const { url, method, user: { roleId }, } = req;
        const resource = url.split("?")[0].split("/")[1];
        const { id: actionId } = yield models_1.default.Action.findOne({
            where: { type: method },
            attributes: ["id"],
        });
        const { id: resourceId } = yield models_1.default.Resource.findOne({
            where: { name: resource },
            attributes: ["id"],
        });
        const persmissionExists = yield models_1.default.Role.findOne({
            include: [
                {
                    model: models_1.default.Operation,
                    where: { enabled: true, actionId, resourceId },
                },
            ],
            where: { id: roleId },
        });
        if (!persmissionExists) {
            next(new exceptions_1.HTTPUnauthorized());
        }
        return next();
    }
    catch (err) {
        next(err);
    }
});
exports.Authtorization = Authtorization;
