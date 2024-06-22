const cors = require('cors');

const dynamicCors = (req, res, next) => {
  if (req.growthbook.isOn('TestingMode')) {
    cors()(req, res, next);
  } else {
    //cors({ origin: process.env.origin, methods: 'GET' })(req, res, next);
    cors()(req, res, next);
  }
};

module.exports = dynamicCors;
