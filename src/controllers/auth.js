const { hitAuthApi, hitOpenApi } = require('../lib/common')
const APP_KEY = process.env.APP_KEY;
const APP_SECRET = process.env.APP_SECRET;

const cache = require('../lib/cache');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'authController', error}
}

const {successResponse, errorResponse} = require('../lib/response');

const getToken = async (reqData) => {
  try {
    let url = 'https://sandbox.dapi.co/v1/auth/ExchangeToken';

    const body = 
    { 
      appSecret: APP_SECRET,
      accessCode: reqData.temp_token, 
      appKey: APP_KEY,
    };

    const response = await hitOpenApi(url, body);

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