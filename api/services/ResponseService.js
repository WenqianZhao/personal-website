module.exports = {
	json: function(status, res, status_code, data, meta) {
		var response = {
			response: {
				status_code: status_code,
				message: message[status_code]
			}
		}
		console.log(message[status_code]);
		if (typeof data !== 'undefined') {
			response.response.data = data;
		}
		if (typeof meta !== 'undefined') {
			response.response.meta = meta;
		}
		return res.status(status).json(response);
	}
};

const message = {
	// 1000 ~ 1999 AuthController
	1000: "Successfully Signed up.",
	1001: "Error occurs when finding a user.",
	1002: "Could not find user.",
	1003: "Error occurs when comparing passwords.",
	1004: "Successfully logged in.",
	1005: "Wrong password.",
	1006: "User has already registered.",
	1007: "Error occurs when creating a user.",
}