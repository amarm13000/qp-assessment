'use strict';
import {
  Model
} from 'sequelize';

interface ActionAttributes{
  type: string
}
export default (sequelize: any, DataTypes: any) => {
  class Action extends Model<ActionAttributes> implements ActionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    type!: string;
    static associate(models: any) {
      // define association here
      Action.belongsToMany(models.Resource,{ through:'Operation'})
      // Action.hasMany(models.Operation,{foreignKey: 'actionId'})
    }
  }
  Action.init({
    type: {
      type: DataTypes.STRING,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Action',
  });
  return Action;
};