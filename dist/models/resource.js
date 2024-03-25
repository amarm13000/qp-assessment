'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Resource extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Resource.belongsToMany(models.Action, { through: 'Operation' });
            // Resource.hasMany(models.Operation,{foreignKey: 'actionId'})
        }
    }
    Resource.init({
        name: {
            type: DataTypes.STRING,
            unique: true
        }
    }, {
        sequelize,
        modelName: 'Resource',
    });
    return Resource;
};
