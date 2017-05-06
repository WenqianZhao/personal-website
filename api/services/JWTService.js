var jwt = require('jsonwebtoken');
var secret = sails.config.local.secret;

module.exports = {
	generateJWT: function(user) {
		var payload = {
			username: user.username,
			email: user.email,
			role: user.role,
			firstname: user.firstname,
			lastname: user.lastname,
			age: user.age,
			gender: user.gender,
			imgUrl: user.imgUrl,
		};
		return jwt.sign(payload, secret, {expiresIn: "1h"});
	},

	verifyJWT: function(token, callback) {
		return jwt.verify(token, secret, {}, callback);
	}
}