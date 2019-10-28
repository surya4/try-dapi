'use strict';

const express  = require('express');
const router  = express.Router();
const authController = require('../controllers/auth');
const dataController = require('../controllers/data');
const payController = require('../controllers/payment');
const jobsController = require('../controllers/jobs');
const webHookController = require('../controllers/webhook');

router.get('/', (req, res, next) => {
  res.render('index');
});

router.get('/connect', (req, res, next) => {
  res.render('connect', {page:'Home', menuId:'connect'});
});

router.post('/token', async (req, res, next) => {
  await authController.getToken(req.body);
});

router.get('/data', async (req, res, next) => {
  const response = await Promise.all([
    dataController.identify(),
    dataController.userAccounts(),
    dataController.accountBalance(),
    dataController.transactions(),
    webHookController.getWebhookData()
  ])
  res.render('data');
});

router.get('/payment', async (req, res, next) => {
  const response = await Promise.all([
    payController.initiatePayment(),
    payController.resumePayment(),
    payController.getBeneficiaryList(),
    webHookController.getWebhookData()

  ]);
  res.render('payment');
});

router.get('/jobs', async (req, res, next) => {
  const response = await jobsController.getJobStatus(req.body.jobID);
  res.render('jobs', {});
});

router.post('/jobs', async (req, res, next) => {
  const response = await jobsController.getJobStatus(req.body.jobID);
  res.render('jobs', {data: JSON.stringify(response)});
});

router.post('/webhooks', async (req, res, next) => {
  const response = await webHookController.addJobToCache(req.body);
  return res.status(response.status).send(response)
});

router.get('/pay-stream', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  res.write('\n');
  await webHookController.getPayFromCache(req, res);
});

router.get('/data-stream', async (req, res) => {
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Cache-Control': 'no-cache',
    'Connection': 'keep-alive',
  });

  res.write('\n');
  await webHookController.getDataFromCache(req, res);
});

module.exports = router;