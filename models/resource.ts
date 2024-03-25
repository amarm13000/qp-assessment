'use strict';
import {
  Model
} from 'sequelize';


interface ResourceAttributes{
  name: string
}
export default  (sequelize: any, DataTypes: any) => {
  class Resource extends Model<ResourceAttributes> implements ResourceAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    name!: string;
    static associate(models: any) {
      // define association here
      Resource.belongsToMany(models.Action,{ through:'Operation'})
      // Resource.hasMany(models.Operation,{foreignKey: 'actionId'})
    }
  }
  Resource.init({
    name:{
      type: DataTypes.STRING,
      unique: true
    }
  }, {
    sequelize,
    modelName: 'Resource',
  });
  return Resource;
};