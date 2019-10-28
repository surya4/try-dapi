'use strict';

const express  = require('express');
const router  = express.Router();
const authController = require('../controllers/auth');
const dataController = require('../controllers/data');
const webHookController = require('../controllers/webhook');

// const constants = require('../lib/constants');

// const {authenticator, allowCustomer, 
//   allowAdmin, allowSeller} = require('../lib/common');


router.get('/', (req, res, next) => {
  res.render('connect', {page:'Home', menuId:'connect'});
});

router.post('/token', async (req, res, next) => {
  const response = await authController.getToken(req.body);
  console.log("you are authenticated", response);
  // res.render('data');
});

router.get('/data', async (req, res, next) => {
  const response = await dataController.identify();
  res.render('data');
});

router.get('/webhooks', (req, res, next) => {
  console.log("show post web hook data", req.body, res.body, req.data, res.data)
  const response = await webHookController.addToQueue(req.data);
  return res.status(response.status).send(response)

  // res.render('webhook');
});

module.exports = router;