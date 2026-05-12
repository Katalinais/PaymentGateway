const { Router } = require('express');
const axios = require('axios');

const router = Router();

router.get('/ping', async (req, res) => {
  const targets = {
    'company-status': process.env.COMPANY_STATUS_URL,
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

  res.json({ service: 'create-payment', status: 'ok', connections });
});

module.exports = router;
