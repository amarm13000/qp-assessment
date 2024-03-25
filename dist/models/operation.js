'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Operation extends sequelize_1.Model {
        static associate(models) {
            // define association here
            // Operation.belongsTo(models.Role)
            // Operation.belongsTo(models.Action)
            Operation.belongsToMany(models.Role, { through: 'Permission' });
            // Operation.hasMany(models.Permission,{foreignKey: 'operationId'})
        }
    }
    Operation.init({
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Operation',
    });
    return Operation;
};
