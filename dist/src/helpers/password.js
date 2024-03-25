"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyPassword = exports.hashPassword = void 0;
const bcryptjs_1 = require("bcryptjs");
const hashPassword = (password) => (0, bcryptjs_1.hashSync)(password, (0, bcryptjs_1.genSaltSync)());
exports.hashPassword = hashPassword;
const verifyPassword = (password, hash) => (0, bcryptjs_1.compareSync)(password, hash);
exports.verifyPassword = verifyPassword;
