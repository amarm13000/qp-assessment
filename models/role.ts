"use strict";
const { Model } = require("sequelize");

interface RoleAttributes {
  id: number;
  type: string;
}

export default (sequelize: any, DataTypes: any) => {
  class Role extends Model<RoleAttributes> implements RoleAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models: any) {
      // define association here
      Role.hasMany(models.User);

      Role.belongsToMany(models.Operation, { through: "Permission" });
      // Role.hasMany(models.Permission, { foreignKey: "roleId" });
    }
  }
  Role.init(
    {
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
    },
    {
      sequelize,
      modelName: "Role",
    }
  );
  return Role;
};
