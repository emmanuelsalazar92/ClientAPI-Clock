const express = require('express');
require('dotenv').config();
const axios = require('axios');
const cors = require('cors');
const { setPolyfills } = require("@growthbook/growthbook");
const { GrowthBook } = require("@growthbook/growthbook");

const app = express();
const PORT = 8000;
const KEY = process.env.clientKey;

console.log("\nTHIS IS THE KEY: " + KEY + " END.\n");


setPolyfills({
  // Required for Node 17 or earlier
  fetch: require("cross-fetch"),undefined
});

app.use(function(req, res, next) {
    // Create a GrowthBook Context
    req.growthbook = new GrowthBook({
      apiHost: "https://cdn.growthbook.io",
      clientKey: KEY,
      trackingCallback: (experiment, result) => {
        // TODO: Use your real analytics tracking system
        console.log("Viewed Experiment", {
          experimentId: experiment.key,
          variationId: result.key
        });
      }
    });
  
    // Clean up at the end of the request
    res.on('close', () => req.growthbook.destroy());
  
    // Wait for features to load (will be cached in-memory for future requests)
    req.growthbook.init({ timeout: 1000 })
      .then(() => next())
  });

// Middleware personalizado para configurar CORS dinámicamente
const dynamicCors = (req, res, next) => {
    if (req.growthbook.isOn("TestingMode")) {
        cors()(req, res, next); // Permitir todas las rutas CORS
    } else {
        cors({ origin: 'https://world-clock-six.vercel.app', methods: 'GET' })(req, res, next);
    }
};

// Usar el middleware dinámico antes de definir las rutas
app.use(dynamicCors);

app.get('/', (req, res) => {
// Get detailed information about the feature evaluation
const result = req.growthbook.evalFeature("TestingMode");

// The value of the feature (or `null` if not defined)
console.log(result.value);

// Why the value was assigned to the user
// One of: `override`, `unknownFeature`, `defaultValue`, `force`, or `experiment`
console.log(result.source);

// The string id of the rule (if any) which was used
console.log(result.ruleId);

// Information about the experiment (if any) which was used
console.log(result.experiment);


    if (req.growthbook.isOn("TestingMode")) {
        res.send("Modo Testing ACTIVO");
      }
      else {
        res.send("Modo Testing INACTIVO");
      }
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