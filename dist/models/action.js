'use strict';
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Action extends sequelize_1.Model {
        static associate(models) {
            // define association here
            Action.belongsToMany(models.Resource, { through: 'Operation' });
            // Action.hasMany(models.Operation,{foreignKey: 'actionId'})
        }
    }
    Action.init({
        type: {
            type: DataTypes.STRING,
            unique: true
        },
    }, {
        sequelize,
        modelName: 'Action',
    });
    return Action;
};
