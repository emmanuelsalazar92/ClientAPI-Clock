const cors = require('cors');

const dynamicCors = (req, res, next) => {
  // Configuración de CORS específica para TestingMode
  const testingCorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  // Configuración de CORS específica para producción
  const productionCorsOptions = {
    origin: process.env.origin,  // Asegúrate de que esta variable de entorno está configurada correctamente
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  };

  // Seleccionar configuración de CORS basada en la condición
  const corsOptions = req.growthbook.isOn('TestingMode') ? testingCorsOptions : productionCorsOptions;

  cors(corsOptions)(req, res, next);
};

module.exports = dynamicCors;
