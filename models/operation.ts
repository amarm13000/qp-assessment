'use strict';
import {
  Model
} from 'sequelize';
interface OperationAttributes{
  id: number
  enabled: boolean
}
export default  (sequelize: any, DataTypes: any) => {
  class Operation extends Model<OperationAttributes> implements OperationAttributes {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    id!: number;
    enabled!: boolean;
    static associate(models: any) {
      // define association here
      // Operation.belongsTo(models.Role)
      // Operation.belongsTo(models.Action)
      Operation.belongsToMany(models.Role, { through: 'Permission' })
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
    enabled:{
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