"use strict";
import { Model } from "sequelize";

interface UserAttributes {
  id: number;
  username: string;
  password: string;
}
export default (sequelize: any, DataTypes: any) => {
  class User extends Model<UserAttributes> implements UserAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    username!: string;
    password!: string;

    static associate(models: any) {
      // define association here
      User.belongsTo(models.Role);
      User.belongsToMany(models.Product,{through:'CartItem'});
      User.hasMany(models.Order);
    }
  }
  User.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        allowNull: false,
        primaryKey: true,
      },
      username: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
