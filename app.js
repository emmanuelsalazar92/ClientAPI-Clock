const express = require('express');
const axios = require('axios');
const cors = require('cors');

const app = express();
const PORT = 8000

// Configura CORS
app.use(cors({
    origin: 'https://world-clock-six.vercel.app', // Reemplaza con el dominio de tu frontend
    methods: 'GET' // Permite solo métodos GET
}));

app.get('/', (req, res) => {
  res.send('Hello World from this side')
});

app.get('/about', (req, res) => {
  res.send('About route 🎉 ')
});

app.get('/current-time', async (req, res) => {
    const timeZone = req.query.timeZone;

    if (!timeZone) {
        return res.status(400).json({ error: 'timeZone query parameter is required' });
    }

    try {
        const response = await axios.get(`https://timeapi.io/api/Time/current/zone?timeZone=${encodeURIComponent(timeZone)}`);
        res.json(response.data);
    } catch (error) {
        console.error('Error fetching the time:', error);
        res.status(500).json({ error: 'Error fetching the time' });
    }
});

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});