const router = require('express').Router();
const { Journey } = require('../models')

router.get('/', async (req, res) => {
  const journeys = await Journey.findAll();
  res.json(journeys);
})

module.exports = router