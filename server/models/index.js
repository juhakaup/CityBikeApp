const Journey = require('./journey');
const Station = require('./station')

Journey.belongsTo(Station, {
  foreignKey: {
    name: "departureStationId"
  }
});

Journey.belongsTo(Station, {
  foreignKey: {
    name: "returnStationId"
  }
});

Journey.sync({ alter: true })
Station.sync({ alter: true })

module.exports = {
  Journey, Station
}