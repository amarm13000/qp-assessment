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
const models_1 = __importDefault(require("../../models"));
const password_1 = require("../helpers/password");
const exceptions_1 = require("../exceptions");
const token_1 = require("../helpers/token");
class AuthController {
    constructor() {
        this.register = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                let [user, { id: userRoleId }] = yield Promise.all([
                    models_1.default.User.findOne({ where: { username } }),
                    models_1.default.Role.findOne({ where: { type: "user" }, attributes: ["id"] }),
                ]);
                if (user) {
                    throw new exceptions_1.HTTPForbidden("Username already exist");
                }
                const hashedPassword = (0, password_1.hashPassword)(password);
                user = yield models_1.default.User.create({
                    username,
                    password: hashedPassword,
                    RoleId: userRoleId,
                });
                res.status(200).json({ id: user.id, success: true });
                return res.end();
            }
            catch (err) {
                next(err);
            }
        });
        this.login = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { username, password } = req.body;
                const user = yield models_1.default.User.findOne({ where: { username } });
                if (!user) {
                    throw new exceptions_1.HTTPUnauthorized("User does not exist");
                }
                if (!(0, password_1.verifyPassword)(password, user.password)) {
                    throw new exceptions_1.HTTPUnauthorized("Invalid credentials.");
                }
                const token = (0, token_1.generateToken)({ userId: user.id, roleId: user.RoleId });
                res.status(200).json({ token });
                return res.end();
            }
            catch (err) {
                next(err);
            }
        });
    }
}
exports.default = new AuthController();
