const express = require('express');
require('dotenv').config();
const app = express();
const PORT = 8000;

const growthbookMiddleware = require('./middleware/growthbook');
const dynamicCors = require('./middleware/cors');
const indexRoutes = require('./routes/index');
const timeRoutes = require('./routes/time');
const statusRoutes = require('./routes/status');

app.use(growthbookMiddleware);
app.use(dynamicCors);

app.use('/', indexRoutes);
app.use('/current-time', timeRoutes);
app.use('/env-status', statusRoutes);

app.listen(PORT, () => {
  console.log(`✅ Server is running on port ${PORT}`);
});
