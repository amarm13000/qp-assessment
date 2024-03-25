'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Permission extends sequelize_1.Model {
        static associate(models) {
            // define association here
            // Permission.belongsTo(models.Role);
            // Permission.belongsTo(models.Operation);
        }
    }
    Permission.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER
        },
        // roleId:{
        //   allowNull: false,
        //   type: DataTypes.INTEGER
        // },
        // operationId:{
        //   allowNull: false,
        //   type: DataTypes.INTEGER
        // },
        enabled: {
            type: DataTypes.BOOLEAN,
            allowNull: false,
            defaultValue: true
        }
    }, {
        sequelize,
        modelName: 'Permission',
    });
    return Permission;
};
