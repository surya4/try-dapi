let TOKEN;
const APP_SECRET = process.env.APP_SECRET;
const APP_KEY = process.env.APP_KEY;
const cache = require('./cache');
const axios = require("axios");

const webhookURL = process.env.WEBHOOK_URL;

const hitAuthApi = async (url, body = {}, headers = {}) => {
  try {
    if (!TOKEN) TOKEN = await cache.get('user-token');

    body.appSecret = APP_SECRET;
    body.addresses = [webhookURL];

    const options = {
      headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${TOKEN}`
      }
    };

    const response = await axios.post(url, body, options);
    return response; 
  } catch (error) {
    throw error;
  }
}

const hitOpenApi = async (url, body = null) => {
  try {
    const response = await axios.post(url, body);
    return response;
  } catch (error) {
   throw error 
  }
}

module.exports = {
  hitAuthApi,
  hitOpenApi,
  webhookURL
}