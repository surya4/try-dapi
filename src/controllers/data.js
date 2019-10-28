const {successResponse, errorResponse} = require('../lib/response');
const { hitAuthApi } = require('../lib/common')

const logStruct = (func, error) => {
  return {'func': func, 'file': 'dataController', error}
}

const identify = async () => {
  try {
    let url = 'https://sandbox.dapi.co/v1/data/Identity';

    const response = await hitAuthApi(url);
    console.log("identify", response.data);
    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('identify', error))
    return errorResponse(error.status, error.message);
  }
};

const userAccounts = async () => {
  try {
    let url = 'https://sandbox.dapi.co/v1/data/UserAccounts';

    const response = await hitAuthApi(url);
    console.log("userAccounts", response.data);
    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('userAccounts', error))
    return errorResponse(error.status, error.message);
  }
};

const accountBalance = async () => {
  try {
    let url = 'https://sandbox.dapi.co/v1/data/AccountBalance';
    
    const response = await hitAuthApi(url);
    console.log("accountBalance", response.data);
    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('accountBalance', error))
    return errorResponse(error.status, error.message);
  }
};


const transactions = async () => {
  try {
    let url = 'https://sandbox.dapi.co/v1/data/Transactions'

    const response = await hitAuthApi(url);
    console.log("transactions", response.data);
    return successResponse(200, response.data )
  } catch (error) {
    console.error('error -> ', logStruct('transactions', error))
    return errorResponse(error.status, error.message);
  }
};

module.exports = {
  identify,
  userAccounts,
  accountBalance,
  transactions
};