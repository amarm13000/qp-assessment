"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class CartItem extends sequelize_1.Model {
        static associate(models) {
            // define association here
            CartItem.belongsTo(models.Product);
        }
    }
    CartItem.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true },
        quantity: {
            type: DataTypes.INTEGER,
            defaultValue: 1,
            validate: { min: 1 },
        },
    }, {
        sequelize,
        modelName: "CartItem",
    });
    return CartItem;
};
