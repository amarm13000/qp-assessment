"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateToken = exports.generateToken = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const dotenv_1 = require("dotenv");
const exceptions_1 = require("../exceptions");
(0, dotenv_1.config)();
const generateToken = (payload) => (0, jsonwebtoken_1.sign)(payload, process.env.SIGINING_KEY, {
    expiresIn: 365 * 24 * 60 * 60 //in sec
});
exports.generateToken = generateToken;
const validateToken = function (token) {
    try {
        const signKey = process.env.SIGINING_KEY;
        return (0, jsonwebtoken_1.verify)(token, signKey);
    }
    catch (err) {
        throw new exceptions_1.HTTPForbidden('Invalid token');
    }
};
exports.validateToken = validateToken;
