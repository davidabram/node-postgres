const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Lane extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Lane.hasMany(models.Task, {
        foreignKey: 'laneId',
        as: 'tasks',
      });
      Lane.belongsTo(models.Table, {
        foreignKey: 'tableId',
        onDelete: 'CASCADE',
      });
    }
  }
  Lane.init({
    name: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Lane',
  });
  return Lane;
};
