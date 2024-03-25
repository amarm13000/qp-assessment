"use strict";
import { Model } from "sequelize";
interface CartItemAttributes {
  id: number;
  quantity: number;
}
export default (sequelize: any, DataTypes: any) => {
  class CartItem
    extends Model<CartItemAttributes>
    implements CartItemAttributes
  {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    quantity!: number;
    static associate(models: any) {
      // define association here
      CartItem.belongsTo(models.Product)
    }
  }
  CartItem.init(
    {
      id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
      quantity: {
        type: DataTypes.INTEGER,
        defaultValue: 1,
        validate: { min: 1 },
      },
    },
    {
      sequelize,
      modelName: "CartItem",
    }
  );
  return CartItem;
};
