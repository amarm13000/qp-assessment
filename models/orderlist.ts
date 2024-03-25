'use strict';
import { Model } from 'sequelize';
interface OrderListInterface{
  id:number;
  quantity:number;
  OrderId:number;
}
export default (sequelize: any, DataTypes:any) => {
  class OrderList extends Model<OrderListInterface> implements OrderListInterface {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    quantity!: number;
    OrderId!: number;
    static associate(models: any) {
      // define association here
      OrderList.belongsTo(models.Order);
      OrderList.belongsTo(models.Product);
    }
  }
  OrderList.init({
    id: {type: DataTypes.INTEGER, autoIncrement: true,primaryKey: true, allowNull: false},
    quantity: {
      type: DataTypes.INTEGER,
      validate: { min: 1 },
    },
    OrderId: {type: DataTypes.INTEGER, allowNull: false}
  }, {
    sequelize,
    modelName: 'OrderList',
  });
  return OrderList;
};