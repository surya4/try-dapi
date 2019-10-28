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
    console.log("addJobToCache reqData -->", reqData)
    if (!isValidPayload(reqData)) return errorResponse(520, reqData);

    const response = await cache.lpush('jobs', reqData);
    console.log("addJobToCache data -->", response);

    return successResponse(200)
  } catch (error) {
    console.error('error -> ', logStruct('addJobToCache', error))
    return errorResponse(error.status, error.message);
  }
};

const getJobFromCache = async (req, res) => {
  try {
    const intervalId = setInterval(async () => {
        const data = await cache.rpop('jobs');
        console.log("getJobFromCache data -->", data);
        if (data) {
          const type = Object.keys(data)[0];
          res.write(`data: ${data}\n\n`);
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
  getJobFromCache,
  getWebhookData
}