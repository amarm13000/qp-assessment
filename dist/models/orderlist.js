'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class OrderList extends sequelize_1.Model {
        static associate(models) {
            // define association here
            OrderList.belongsTo(models.Order);
            OrderList.belongsTo(models.Product);
        }
    }
    OrderList.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        quantity: {
            type: DataTypes.INTEGER,
            validate: { min: 1 },
        },
        OrderId: { type: DataTypes.INTEGER, allowNull: false }
    }, {
        sequelize,
        modelName: 'OrderList',
    });
    return OrderList;
};
