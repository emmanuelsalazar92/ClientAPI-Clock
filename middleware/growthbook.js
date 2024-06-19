const createGrowthBookInstance = require('../config/growthbook');

const growthbookMiddleware = async (req, res, next) => {
  req.growthbook = createGrowthBookInstance();

  res.on('close', () => req.growthbook.destroy());

  try {
    await req.growthbook.init({ timeout: 1000 });
    next();
  } catch (error) {
    console.error('Error initializing GrowthBook:', error);
    res.status(500).send('Internal Server Error');
  }
};

module.exports = growthbookMiddleware;
