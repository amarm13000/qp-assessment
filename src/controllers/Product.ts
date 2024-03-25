import HTTPController from "./HttpController";
import db from '../../models';

class Product extends HTTPController{
    constructor(model:any){
        super(model)
        this.model=model;
    }
}

export default new Product(db.Product);