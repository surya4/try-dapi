const axios = require("axios");

const APP_SECRET = process.env.APP_SECRET;
const APP_KEY = process.env.APP_KEY;

const cache = require('../lib/cache');

const logStruct = (func, error) => {
  return {'func': func, 'file': 'authController', error}
}

const {successResponse, errorResponse} = require('../lib/response');

const addToQueue = async (req) => {
  try {
    
    console.log("addtoQueue -->", req. data, req.body)

    const reqData = JSON.stringify(req.body);

		if (!reqData) {
      return successResponse(200)
			// return res.status(200).send('success');
		}
		
		// // validate signature
		// if (util.isValidPayload(signature, payload)) {

		// 	// add to queue
		// 	queue.addToQueue(payload);
		// 	console.log('task added to queue ');
		
		// 	return res.status(200).send('success');
		// } else {
		// 	return res.status(401).send('FORBIDDEN');
		// }
    

    return successResponse(200, response )
  } catch (error) {
    console.error('error -> ', logStruct('identify', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  addToQueue
}