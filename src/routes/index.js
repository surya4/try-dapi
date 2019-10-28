'use strict';

const express  = require('express');
const router  = express.Router();
const authController = require('../controllers/auth');
const dataController = require('../controllers/data');
const webHookController = require('../controllers/webhook');


router.get('/connect', (req, res, next) => {
  console.log("called connect")
  res.render('connect', {page:'Home', menuId:'connect'});
});

router.post('/token', async (req, res, next) => {
  console.log("called token")
  const response = await authController.getToken(req.body);
  console.log("you are authenticated", response);
  // res.render('data');
});

router.get('/data', async (req, res, next) => {
  const response = await dataController.identify();
  res.render('data');
});

router.get('/webhooks', async (req, res, next) => {
  console.log("show get web hook data", req.body, res.body, req.data, res.data)
  await webHookController.getWebhookData();
  res.render('webhook');
});

router.post('/webhooks', async (req, res, next) => {
  console.log("show post web hook data", req.body)
  const response = await webHookController.addToQueue(req.body);
  return res.status(response.status).send(response)

  // res.render('webhook');
});

module.exports = router;