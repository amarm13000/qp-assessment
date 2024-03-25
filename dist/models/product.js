'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Product extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Product.belongsToMany(models.User, { through: 'CartItem' });
            Product.hasMany(models.CartItem, { foreignKey: 'ProductId' });
            Product.hasMany(models.OrderList, { foreignKey: 'ProductId' });
        }
    }
    Product.init({
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        inventory: {
            type: DataTypes.INTEGER,
            validate: { min: 0 },
            allowNull: false
        },
        price: {
            type: DataTypes.DOUBLE,
            allowNull: false
        }
    }, {
        sequelize,
        modelName: 'Product',
    });
    return Product;
};
