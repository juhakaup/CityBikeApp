const router = require('express').Router();
const { Journey } = require('../models')

// Journey route
router.get('/', async (req, res) => {
  reqPage = parseInt(req.query.page);
  reqSize = parseInt(req.query.size);

  const page = (!isNaN(reqPage) && reqPage > 0) ? reqPage : 0;
  const size = (!isNaN(reqSize) && reqSize > 0 && reqSize <= 100 ? reqSize : 10)

  const { count, rows } = await Journey.findAndCountAll({
    // where: {
    //   departureStationId: id
    // },
    // order: [
    //   ['distance', 'DESC'],
    // ],
    offset: page * size,
    limit: size
  });

  res.json({
    content: rows,
    numPages: Math.ceil(count / size)
  });
})

module.exports = router