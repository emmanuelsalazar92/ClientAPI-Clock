const express = require('express');
const fetchCurrentWeather = require('../utils/fetchCurrentWeather');
const router = express.Router();

router.get('/', async (req, res) => {
  const coordenates = req.query.coordenates;

  if (!coordenates) {
    return res.status(400).json({ error: 'coordenates query parameter is required' });
  }

  try {
    const data = await fetchCurrentWeather(coordenates);
    res.json(data);
  } catch (error) {
    console.error('Error fetching the current weather:', error);
    res.status(500).json({ error: 'Error fetching the current weather' });
  }
});

module.exports = router;
