const axios = require("axios");
const {successResponse, errorResponse} = require('../lib/response');
// const { validateUserRegister, validateUserRole, validateUserPermission, 
//   validateAuth } = require('../validators/users');

const cache = require('../lib/cache');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'dataController', error}
}

let TOKEN;
const APP_SECRET = process.env.APP_SECRET;
const APP_KEY = process.env.APP_KEY;

const identify = async () => {
  try {
    // const validInput = validateUserRegister(reqData);
    if (!TOKEN) TOKEN = await cache.get('user-token');

    let url = 'https://sandbox.dapi.co/v1/data/Identity';
    const headers = {
      "Authorization" : `Bearer ${TOKEN}`
    }
    const body = 
    { 
      appSecret: APP_SECRET, 
      addresses: ['http://ddaa2b87.ngrok.io/webhooks']
    };

    const response = await axios.post(url, headers, body)

    console.log("identify", response.data);

    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('identify', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  identify
};