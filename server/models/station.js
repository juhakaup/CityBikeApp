const { Model, DataTypes } = require('sequelize');

const { sequelize } = require('../util/db');

class Station extends Model {}

Station.init({
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nameFin: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nameSwe: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  nameEng: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  addressFin: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  addressSwe: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  cityFin: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  citySwe: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  operator: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  capacity: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  locationX: {
    type: DataTypes.DECIMAL(9,6),
    allowNull: false
  },
  locationY: {
    type: DataTypes.DECIMAL(8,6),
    allowNull: false
  }
}, {
    sequelize,
    underscored: true,
    timestamps: false,
    modelName: 'station'
})

module.exports = Station;