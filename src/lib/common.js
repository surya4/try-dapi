let TOKEN;
const APP_SECRET = process.env.APP_SECRET;
const APP_KEY = process.env.APP_KEY;
const cache = require('./cache');
const axios = require("axios");

const webhookURL = process.env.WEBHOOKURL || "http://e3300d33.ngrok.io/webhooks";

const hitAuthApi = async (url, body = {}, headers = {}) => {
  try {
    if (!TOKEN) TOKEN = await cache.get('user-token');
    headers["Authorization"] = `Bearer ${TOKEN}`;

    body["appSecret"] = APP_SECRET;
    body["addresses"] = [webhookURL];

    console.log("hit api, body", body)
  
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
  hitOpenApi,
  webhookURL
}