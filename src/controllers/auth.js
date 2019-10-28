const axios = require("axios");

const APP_SECRET = process.env.APP_SECRET;
const APP_KEY = process.env.APP_KEY;

const cache = require('../lib/cache');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'authController', error}
}

const {successResponse, errorResponse} = require('../lib/response');

const getToken = async (reqData) => {
  try {
    // const validInput = validateUserRegister(reqData);

    let url = 'https://sandbox.dapi.co/v1/auth/ExchangeToken';

    const body = 
    { 
      appSecret: APP_SECRET, accessCode: reqData.temp_token, appKey: APP_KEY,
    };

    const response = await axios.post(url, body);

    console.log("response", response);
    console.log("body", response.data);

    if (response.data.success) {
      await cache.set('user-token', response.data.accessToken); 
    }
    return successResponse(200, response )
  } catch (error) {
    console.error('error -> ', logStruct('identify', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  getToken
}