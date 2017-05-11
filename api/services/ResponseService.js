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
	1008: "Error occurs when update a user.",
	1009: "Successfully update a user.",
	1010: "Error occurs when changing password.",
	1011: "Successfully changed password.",

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
	1518: "Error occurs when search posts.",
	1519: "No post matched.",
	1520: "Successfully find the matched posts",
	1521: "Successfully get top5 posts.",
	1522: "Error occurs when save a post's collectors.",
	1523: "Successfully add a user as a post's collector.",
	1524: "Successfully get all collectors.",

	// 2000 ~ 2199 TagController
	2000: "Error occurs when get all tags.",
	2001: "No tag now.",
	2002: "Successfully get all tags.",

	// 2200 ~ 2699 CommentController
	2200: "Error occurs when get all root comments for one post.",
	2201: "No comment now.",
	2202: "Successfully get all root comments for one post.",
	2203: "Error occurs when add a root comment.",
	2204: "Successfully add a root comment.",
	2205: "Error occurs when find one comment.",
	2206: "No matched comment.",
	2207: "Error occurs when update a comment.",
	2208: "Successfully update a comment.",
	2209: "Successfully add one chaining comment.",
	2210: "Error occurs when add a chaining comment.",
	
}