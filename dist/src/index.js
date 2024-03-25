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
const index_1 = __importDefault(require("./routes/index"));
const express_1 = __importDefault(require("express"));
const models_1 = __importDefault(require("../models"));
const port = 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
// app.use(auth);
(0, index_1.default)(app);
models_1.default.sequelize
    .sync({
    alter: false,
})
    .then(() => __awaiter(void 0, void 0, void 0, function* () {
    // // create role
    // role.map((r) => {
    //   db.Role.create(r);
    // });
    // //create users
    // user.map((u) => {
    //   db.User.create(u);
    // });
    // //create action
    // action.map((a) => {
    //   db.Action.create(a);
    // });
    // //create resource
    // resource.map((r) => {
    //   db.Resource.create(r);
    // });
    // //create product
    // product.map((p) => {
    //   db.Product.create(p);
    // });
    // //create operation
    // operation.map((o)=>{
    //   db.Operation.create(o);
    // })
    //   //create permission
    //  await Promise.resolve(permission.map((p)=>{
    //   db.Permission.create(p);
    // })) 
    console.log("Db connected");
    app.listen(port, () => {
        console.log("Express server running");
    });
    // const getAction = await db.actions.findOne({ where: {type: 'GET'}})
    // const postAction = await db.actions.findOne({ where: {type: 'POST'}})
    // const putAction = await db.actions.findOne({ where: {type: 'PUT'}})
    // const patchAction = await db.actions.findOne({ where: {type: 'PATCH'}})
    // const deleteAction = await db.actions.findOne({ where: {type: 'DELETE'}})
    // const productResource= await db.resources.findOne({ where: {name: 'product'}});
    // const userResource= await db.resources.findOne({ where: {name: 'user'}});
    // const allActions=await db.actions.findAll({})
    // productResource.addActions(allActions);
    // userResource.addActions(allActions);
}));
