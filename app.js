const express = require('express');
const axios = require('axios');

const app = express();
const PORT = 8000

app.get('/', (req, res) => {
  res.send('Hello World')
});

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
});

app.get('/current-time', async (req, res) => {
    try {
        const response = await axios.get('https://timeapi.io/api/Time/current/zone?timeZone=Europe/Amsterdam');
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching the time:', error);
        res.status(500).json({ error: 'Error fetching the time' });
    }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});