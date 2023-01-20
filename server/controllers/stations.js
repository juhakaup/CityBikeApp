const router = require('express').Router();
const { Station } = require('../models');

// Get all stations
router.get('/', async (req, res) => {
  reqPage = parseInt(req.query.page);
  reqSize = parseInt(req.query.size);

  const page = (!isNaN(reqPage) && reqPage > 0) ? reqPage : 0;
  const size = (!isNaN(reqSize) && reqSize > 0 && reqSize <= 100 ? reqSize : 10)

  const { count, rows } = await Station.findAndCountAll({
    offset: page * size,
    limit: size
  });

  res.json({
    content: rows,
    numPages: Math.ceil(count / size)
  });
})

// Get a single station
router.get('/:id', async (req, res) => {
  const station = await Station.findByPk(req.params.id);
  if (station) {
    res.json(station);
  } else {
    res.status(404).end();
  }
})

module.exports = router