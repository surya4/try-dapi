const axios = require("axios");

const logStruct = (func, error) => {
  return {'func': func, 'file': 'hookController', error}
}

const {successResponse, errorResponse} = require('../lib/response');
const { isValidPayload } = require('../lib/validator');
const { webhookURL } = require('../lib/common');
const cache = require('../lib/cache');

const getWebhookData = async () => {
  try {
    const response = await axios.post(webhookURL)
    return successResponse(200)
  } catch (error) {
    console.error('error -> ', logStruct('getWebhookData', error))
    return errorResponse(error.status, error.message);
  }
};

const addJobToCache = async (reqData) => {
  try {
    if (!isValidPayload(reqData)) return errorResponse(520, reqData);

    const key = Object.keys(reqData);
    let queue, response;

    if (key.length > 0) {
      if (['identity', 'userAccounts', 'balance', 'transactions'].indexOf(key[0]) > -1) {
        queue = 'data-jobs'
      } else {
        queue = 'pay-jobs'
      }
      const response = await cache.lpush(queue, reqData);
    }

    return successResponse(200)
  } catch (error) {
    console.error('error -> ', logStruct('addJobToCache', error))
    return errorResponse(error.status, error.message);
  }
};

const getDataFromCache = async (req, res) => {
  try {
    const intervalId = setInterval(async () => {
        let data = await cache.rpop('data-jobs');
        if (data) {
          data = JSON.parse(data);
          const keys = Object.keys(data);
          res.write(`data: ${JSON.stringify(data)}\n\n`);
        }
    }, 10000);

    req.on('close', () => {
        clearInterval(intervalId);
    });

  } catch (error) {
    console.error('error -> ', logStruct('getJobFromCache', error))
    return errorResponse(error.status, error.message);
  }
};

const getPayFromCache = async (req, res) => {
  try {
    const intervalId = setInterval(async () => {
        let data = await cache.rpop('pay-jobs');
        if (data) {
          data = JSON.parse(data);
          const keys = Object.keys(data);
            res.write(`data: ${JSON.stringify(data)}\n\n`); 
        }
    }, 10000);

    req.on('close', () => {
        clearInterval(intervalId);
    });

  } catch (error) {
    console.error('error -> ', logStruct('getJobFromCache', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  addJobToCache,
  getDataFromCache,
  getPayFromCache,
  getWebhookData
}