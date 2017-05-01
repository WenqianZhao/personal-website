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
	// 1000 ~ 1499 AuthController
	1000: "Successfully Signed up.",
	1001: "Error occurs when finding a user.",
	1002: "Could not find user.",
	1003: "Error occurs when comparing passwords.",
	1004: "Successfully logged in.",
	1005: "Wrong password.",
	1006: "User has already registered.",
	1007: "Error occurs when creating a user.",

	// 1500 ~ 1999 PostController
	1500: "Error occurs when find all posts.",
	1501: "No post now.",
	1502: "Successfully get all posts.",
	1503: "Error occurs when find one post.",
	1504: "Post not found.",
	1505: "Successfully find the post.",
	1506: "Post title already exists.",
	1507: "Error occurs when create a post.",
	1508: "Error occurs when findOrCreate a tag.",
	1509: "Error occurs when save a tag.",
	1510: "Error occurs when save a post.",
	1511: "Error occurs when finding a user.",
	1512: "Successfully create a new post.",
	1513: "Successfully modified a post.",
	1514: "Error occurs when find a tag.",
	1515: "Successfully get all posts by tag.",
	1516: "Error occurs when update a post.",
	1517: "Successfully update a post.",

	// 2000 ~ 2200 TagController
	2000: "Error occurs when get all tags.",
	2001: "No tag now.",
	2002: "Successfully get all tags.",



	
}