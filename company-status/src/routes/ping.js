const { Router } = require('express');
const axios = require('axios');

const router = Router();

router.get('/ping', async (req, res) => {
  const targets = {
    'create-payment': process.env.CREATE_PAYMENT_URL,
    'settle-payments': process.env.SETTLE_PAYMENTS_URL,
  };

  const connections = {};
  await Promise.all(
    Object.entries(targets).map(async ([name, url]) => {
      try {
        await axios.get(`${url}/health`, { timeout: 3000 });
        connections[name] = 'ok';
      } catch {
        connections[name] = 'unreachable';
      }
    })
  );

  res.json({ service: 'company-status', status: 'ok', connections });
});

module.exports = router;
