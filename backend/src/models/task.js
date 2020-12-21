const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Task extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Task.belongsTo(models.Lane, {
        foreignKey: 'laneId',
        onDelete: 'CASCADE',
      });
      Task.belongsTo(models.User, {
        foreignKey: 'userId',
        onDelete: 'SET NULL',
      });
      Task.belongsTo(models.User, {
        foreignKey: 'lockedBy',
        onDelete: 'SET NULL',
      });
    }
  }
  Task.init({
    title: DataTypes.STRING,
    content: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Task',
  });
  return Task;
};
