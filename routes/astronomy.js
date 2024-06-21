const express = require('express');
const fetchAstronomy = require('../utils/fetchAstronomy');
const router = express.Router();

router.get('/', async (req, res) => {
  const coordenates = req.query.coordenates;

  if (!coordenates) {
    return res.status(400).json({ error: 'coordenates query parameter is required' });
  }

  try {
    const data = await fetchAstronomy(coordenates);
    res.json(data);
  } catch (error) {
    console.error('Error fetching the astronomy information:', error);
    res.status(500).json({ error: 'Error fetching the astronomy information' });
  }
});

module.exports = router;
