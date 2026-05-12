const express = require('express');
const pingRouter = require('./routes/ping');

const app = express();

app.use(express.json());

app.get('/health', (req, res) => {
  res.json({ service: 'company-status', status: 'ok' });
});

app.use(pingRouter);

module.exports = app;
