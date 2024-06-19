const { GrowthBook } = require('@growthbook/growthbook');

const createGrowthBookInstance = () => {
  return new GrowthBook({
    apiHost: process.env.apiHost,
    clientKey: process.env.clientKey,
  });
};

module.exports = createGrowthBookInstance;
