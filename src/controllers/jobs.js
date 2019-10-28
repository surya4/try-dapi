const {successResponse, errorResponse} = require('../lib/response');
const { hitAuthApi } = require('../lib/common')
const APP_KEY = process.env.APP_KEY;

const logStruct = (func, error) => {
  return {'func': func, 'file': 'jobsController', error}
}

const getJobStatus = async (jobID) => {
  try {
    let url = 'https://sandbox.dapi.co/v1/jobs/GetJobStatus';

    const body = {
      appKey: APP_KEY,
      jobID,

    }

    const response = await hitAuthApi(url);
    console.log("body -->", body);
    console.log("getJobStatus", response.data);
    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('getJobStatus', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  getJobStatus
};