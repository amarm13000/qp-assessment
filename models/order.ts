'use strict';
import { Model } from 'sequelize';
interface OrderInterface{
  id: number,
  enabled: boolean,
  active: boolean
}

export default (sequelize:any, DataTypes: any) => {
  class Order extends Model<OrderInterface> implements OrderInterface {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    enabled!: boolean;
    active!: boolean;
    static associate(models:any) {
      // define association here  
      Order.belongsTo(models.User)
      Order.hasMany(models.OrderList, {foreignKey: 'OrderId'})
    }
  }
  Order.init({
    id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
    enabled:{ type: DataTypes.BOOLEAN, defaultValue: true},
    active:{type: DataTypes.BOOLEAN, defaultValue:true}
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};