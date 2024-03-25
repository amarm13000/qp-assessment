"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const { Model } = require("sequelize");
exports.default = (sequelize, DataTypes) => {
    class Role extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            // define association here
            Role.hasMany(models.User);
            Role.belongsToMany(models.Operation, { through: "Permission" });
            // Role.hasMany(models.Permission, { foreignKey: "roleId" });
        }
    }
    Role.init({
        id: {
            allowNull: false,
            autoIncrement: true,
            primaryKey: true,
            type: DataTypes.INTEGER,
        },
        type: {
            type: DataTypes.STRING,
            unique: true,
        }
    }, {
        sequelize,
        modelName: "Role",
    });
    return Role;
};
