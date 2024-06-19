const express = require('express');
const fetchTime = require('../utils/fetchTime');
const router = express.Router();

router.get('/', async (req, res) => {
  const timeZone = req.query.timeZone;

  if (!timeZone) {
    return res.status(400).json({ error: 'timeZone query parameter is required' });
  }

  try {
    const data = await fetchTime(timeZone);
    res.json(data);
  } catch (error) {
    console.error('Error fetching the time:', error);
    res.status(500).json({ error: 'Error fetching the time' });
  }
});

module.exports = router;
