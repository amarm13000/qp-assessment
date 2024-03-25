import HTTPController from "./HttpController";
import db from '../../models';

class User extends HTTPController{
    constructor(model:any){
        super(model)
        this.model=model;
    }
}

export default new User(db.User);