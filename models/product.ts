'use strict';
import { Model } from 'sequelize';
interface ProductAttributes {
  id: number;
  name: string;
  inventory: number;
  price: number;
}
export default (sequelize: any, DataTypes: any) => {
  class Product extends Model<ProductAttributes> implements ProductAttributes{
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    name!: string;
    inventory!: number;
    price!: number;
    static associate(models: any) {
      // define association here
      Product.belongsToMany(models.User,{through:'CartItem'});
      Product.hasMany(models.CartItem,{ foreignKey: 'ProductId'})
      Product.hasMany(models.OrderList,{foreignKey:'ProductId'});
    }
  }
  Product.init({
    id:{
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
      allowNull: false
    },
    name:{
      type: DataTypes.STRING,
      allowNull: false
    },
    inventory:{
      type: DataTypes.INTEGER,
      validate:{min:0},
      allowNull: false
    },
    price:{
      type: DataTypes.DOUBLE,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};