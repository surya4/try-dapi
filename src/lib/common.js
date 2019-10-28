let TOKEN;
const APP_SECRET = process.env.APP_SECRET;
const APP_KEY = process.env.APP_KEY;

const axios = require("axios");

const hitAuthApi = async (url, body = {}, headers = {}) => {
  try {
    if (!TOKEN) TOKEN = await cache.get('user-token');
    headers["Authorization"] = `Bearer ${TOKEN}`;

    body["appSecret"] = APP_SECRET;
    body["addresses"] = ["http://14fb34aa.ngrok.io/webhooks"];
  
    const response = await axios.post(url, headers, body);
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
  hitOpenApi
}