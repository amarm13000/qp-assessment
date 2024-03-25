"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_1 = __importDefault(require("./user"));
const product_1 = __importDefault(require("./product"));
const cartitem_1 = __importDefault(require("./cartitem"));
const order_1 = __importDefault(require("./order"));
const auth_1 = __importDefault(require("./auth"));
const auth_2 = require("../middlewares/auth");
const dotenv_1 = require("dotenv");
(0, dotenv_1.config)();
const exceptions_1 = require("../exceptions");
const intiateRoutes = (app) => {
    app.use(process.env.APPLICATION_BASE, auth_1.default);
    app.use(process.env.APPLICATION_BASE, auth_2.Authtorization);
    app.use(process.env.APPLICATION_BASE, user_1.default);
    app.use(process.env.APPLICATION_BASE, product_1.default);
    app.use(process.env.APPLICATION_BASE, cartitem_1.default);
    app.use(process.env.APPLICATION_BASE, order_1.default);
    app.use((err, req, res, next) => {
        console.error(err.stack);
        // Comment: add custom error handling here
        if (err instanceof exceptions_1.HTTPError)
            return res.status(err.status).send({ messsage: err.message });
        return res
            .status(500)
            .send({ messsage: "Internal server error. Something wrong." });
    });
};
exports.default = intiateRoutes;
