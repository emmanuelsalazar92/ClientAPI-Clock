const axios = require('axios');

const fetchAstronomy = async (query) => {
  const key = process.env.weatherKey;
  const date = getCurrentDateFormatted();
  const response = await axios.get(`http://api.weatherapi.com/v1/astronomy.json?key=${encodeURIComponent(key)}&q=${encodeURIComponent(query)}&dt=${encodeURIComponent(date)}`);
  return response.data;
};

module.exports = fetchAstronomy;
