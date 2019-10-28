const isValidPayload = (payload) => {
  if (payload || payload.jobID || payload.success) return true;
	return false;
}

module.exports = {
  isValidPayload
}