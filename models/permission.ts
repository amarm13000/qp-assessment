'use strict';
import {
  Model
} from 'sequelize';
interface PermissionAttributes{
  id: number,
  enabled: boolean,
}
export default (sequelize: any, DataTypes: any) => {
  class Permission extends Model<PermissionAttributes> implements PermissionAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    // roleId!: number;
    // operationId!: number;
    enabled!: boolean;
    static associate(models: any) {
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
    enabled:  {
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