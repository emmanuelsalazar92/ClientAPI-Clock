const axios = require('axios');

const fetchTime = async (timeZone) => {
  const response = await axios.get(`https://timeapi.io/api/Time/current/zone?timeZone=${encodeURIComponent(timeZone)}`);
  return response.data;
};

module.exports = fetchTime;
