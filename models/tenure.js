'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Tenure extends Model {
    static associate(models) {
      // Define association here
      Tenure.belongsTo(models.Player, { foreignKey: 'id' });
    }
  }
  Tenure.init({
    playerID: DataTypes.INTEGER,
    team: DataTypes.STRING,
    startDate: DataTypes.DATE,
    endDate: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Tenure',
  });
  return Tenure;
};
