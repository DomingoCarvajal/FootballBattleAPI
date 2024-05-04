'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class CappedPlayer extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      CappedPlayer.belongsTo(models.Player, { foreignKey: 'id' })
      // define association here
    }
  }
  CappedPlayer.init({
    playerID: DataTypes.INTEGER,
    nation: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'CappedPlayer',
  });
  return CappedPlayer;
};