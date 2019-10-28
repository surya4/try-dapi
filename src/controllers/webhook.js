const axios = require("axios");

const APP_SECRET = process.env.APP_SECRET;
const APP_KEY = process.env.APP_KEY;

const cache = require('../lib/cache');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'authController', error}
}

const {successResponse, errorResponse} = require('../lib/response');
const { isValidPayload } = require('../lib/validator');

const addToQueue = async (reqData) => {
  try {
    console.log("addtoQueue reqData -->", reqData)
    if (!isValidPayload(reqData)) return errorResponse(520, reqData);
		

		// 	// add to queue
		// 	queue.addToQueue(payload);
		// 	console.log('task added to queue ');
		
		// 	return res.status(200).send('success');
		// } else {
		// 	return res.status(401).send('FORBIDDEN');
		// }
    

    return successResponse(200, response )
  } catch (error) {
    console.error('error -> ', logStruct('addToQueue', error))
    return errorResponse(error.status, error.message);
  }
};

const getWebhookData = async () => {
  try {
    console.log("hit post webhook")
    let url = 'http://14fb34aa.ngrok.io/webhooks'
    const response = await axios.post(url)
    return successResponse(200)
  } catch (error) {
    console.error('error -> ', logStruct('getWebhookData', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  addToQueue,
  getWebhookData
}