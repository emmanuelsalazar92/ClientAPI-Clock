const axios = require('axios');

const fetchWeather = async (query) => {
  const key = process.env.weatherKey;
  const response = await axios.get(`http://api.weatherapi.com/v1/current.json?key=${encodeURIComponent(key)}&q=${encodeURIComponent(query)}&aqi=no`);
  return response.data;
};

module.exports = fetchWeather;
