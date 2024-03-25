import intiateRoutes from "./routes/index";
import express, { Express } from "express";
import db from "../models";
import { role, user, action, resource, product,operation,permission } from "../seeders/index";


const port = 3000;
const app: Express = express();

app.use(express.json());

// app.use(auth);
intiateRoutes(app);

db.sequelize
  .sync({
    alter: false,
  })
  .then(async () => {
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
  });
