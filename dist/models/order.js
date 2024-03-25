'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Order extends sequelize_1.Model {
        static associate(models) {
            // define association here  
            Order.belongsTo(models.User);
            Order.hasMany(models.OrderList, { foreignKey: 'OrderId' });
        }
    }
    Order.init({
        id: { type: DataTypes.INTEGER, autoIncrement: true, primaryKey: true, allowNull: false },
        enabled: { type: DataTypes.BOOLEAN, defaultValue: true },
        active: { type: DataTypes.BOOLEAN, defaultValue: true }
    }, {
        sequelize,
        modelName: 'Order',
    });
    return Order;
};
