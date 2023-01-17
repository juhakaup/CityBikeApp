const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Journey extends Model {}

Journey.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  departure: {
    type: DataTypes.DATE,
    allowNull: false
  },
  return: {
    type: DataTypes.DATE,
    allowNull: false
  },
  departureStationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  departureStationName: {
    type: DataTypes.TEXT,
  },
  returnStationId: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  returnStationName: {
    type: DataTypes.TEXT,
  },
  distance: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  duration: {
    type: DataTypes.INTEGER,
    allowNull: false
  }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'journey'
  })

module.exports = Journey;