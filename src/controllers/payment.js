const {successResponse, errorResponse} = require('../lib/response');
const { hitAuthApi } = require('../lib/common')

const logStruct = (func, error) => {
  return {'func': func, 'file': 'payController', error}
}

const initiatePayment = async () => {
  try {
    let url = 'https://sandbox.dapi.co/v1/payment/InitiatePayment';

    const body = {
      amount: 14,
      beneficiary: 'dapi_user1'
    }

    const response = await hitAuthApi(url, body);
    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('initiatePayment', error))
    return errorResponse(error.status, error.message);
  }
};

const resumePayment = async (jobID, otp) => {
  try {
    let url = 'https://sandbox.dapi.co/v1/payment/resumePayment';

    const body = {
      jobID, otp
    }

    const response = await hitAuthApi(url, body);
    return successResponse(200, response.data)
  } catch (error) {
    console.error('error -> ', logStruct('resumePayment', error))
    return errorResponse(error.status, error.message);
  }
};

const getBeneficiaryList = async () => {
  try {
    let url = 'https://sandbox.dapi.co/v1/payment/GetBeneficiaryList';
    
    const response = await hitAuthApi(url);
    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('getBeneficiaryList', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  initiatePayment,
  resumePayment,
  getBeneficiaryList,
};