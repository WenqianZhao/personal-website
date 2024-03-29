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
	1012: "Error occurs when verifying token.",
	1013: "Successfully refresh token.",
	1014: "User is not active now.",

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
	1525: "Error occurs when delete a post.",
	1526: "Successfully delete a post.",
	1527: "Error occurs when find a tag.",
	1528: "Error occurs when delete a tag.",
	1529: "Error occurs when find a post by category.",
	1530: "No posts found for such category.",
	1531: "Successfully find all posts by category.",
	

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

	// 2700 ~ 2999 UserController
	2700: "Successfully get all collections of one user.",
	2701: "Error occurs when get all users.",
	2702: "Successfully get all users.",
	2703: "No collection for this user.",
	
	// 3000 ~ 3099 ContactController
	3000: "Error occurs when create a new advice.",
	3001: "Successfully create a new advice.",
	3002: "Error occurs when find all advice.",
	3003: "No advice yet.",
	3004: "Successfully get all advices.",
	3005: "Error occurs when delete one advice.",
	3006: "Successfully delete one advice.",
	3007: "Error occurs when get one advice.",
	3008: "Successfully get one advice.",

	// 3100 ~ 3199 TodolistController
	3100: "Error occurs when find todolist of a user.",
	3101: "No todolist found for such user.",
	3102: "Successfully get all todolist items of a user.",
	3103: "Error occurs when create a new todolist item.",
	3104: "Successfully add a new todolist item.",
	3105: "Error occurs when modify a new todolist item.",
	3106: "Successfully modify a new todolist item.",
	3107: "Error occurs when delete a todolist item.",
	3108: "Successfully delete a todolist item.",
	3109: "Error occurs when change an item's class.",
	3110: "Successfully change an item's class.",

	// 3200 ~ 3299 CategoryController
	3200: "Error occurs when find all categories.",
	3201: "No category is created.",
	3202: "Successfully find all categories.",
	3203: "Error occurs when find a category.",
	3204: "Category already exists.",
	3205: "Error occurs when create a new category.",
	3206: "Successfully create a new category.",
	3207: "No such category.",
	3208: "Error occurs when update a category.",
	3209: "Successfully update a category.",
}