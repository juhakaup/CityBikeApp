const express = require('express');
const app = express();

const { PORT } = require('./util/config')
const { connectToDatabase } = require('./util/db')

const journeysRouter = require('./controllers/journeys');
const stationRouter = require('./controllers/stations');

app.use(express.json());

app.use('/api/journeys', journeysRouter);
app.use('/api/stations', stationRouter);

const start = async () => {
  await connectToDatabase();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  });
}

start();
