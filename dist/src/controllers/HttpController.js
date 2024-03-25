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
Object.defineProperty(exports, "__esModule", { value: true });
const exceptions_1 = require("../exceptions");
class HTTPController {
    constructor(model) {
        //Comment:create resorce with details passed in the request body
        this.create = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = yield this.model.create(Object.assign({}, req.body));
                this.response(res, resource);
            }
            catch (err) {
                next(err);
            }
        });
        //Comment:get all resources
        this.getAll = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const resource = yield this.model.findAll({});
                this.response(res, resource);
            }
            catch (err) {
                next(err);
            }
        });
        //Comment:get resorce with resource code
        this.get = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                const resource = yield this.model.findOne({ where: { id } });
                if (!resource) {
                    throw new exceptions_1.HTTPBadRequest("No such resource exist.");
                }
                this.response(res, resource);
            }
            catch (err) {
                next(err);
            }
        });
        //Comment:update resorce(with code) with details
        this.update = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let resource = yield this.model.findOne({ where: { id } });
                if (!resource) {
                    throw new exceptions_1.HTTPBadRequest("No resource exist for patch");
                }
                resource = yield resource.update(req.body);
                this.response(res, resource);
            }
            catch (err) {
                next(err);
            }
        });
        //Comment:delete resorce with passed details
        this.delete = (req, res, next) => __awaiter(this, void 0, void 0, function* () {
            try {
                const { id } = req.params;
                let resource = yield this.model.findOne({ where: { id } });
                if (!resource) {
                    throw new exceptions_1.HTTPBadRequest("No resource exist for delete");
                }
                yield this.model.destroy({
                    where: { code: req.params.id },
                });
                this.response(res, { success: "true" });
            }
            catch (err) {
                next();
            }
        });
        this.model = model;
    }
    response(res, data, status = 200) {
        res.status(status).json(data);
        return res.end();
    }
}
exports.default = HTTPController;
