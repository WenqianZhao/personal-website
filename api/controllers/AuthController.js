/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	signup: function(req, res) {
		var params = req.params.all();
		var username = params.username;
		var email = params.email;
		var password = params.password;
		var saltRounds = 10;
		bcrypt.genSalt(saltRounds, function(err, salt) {
	    bcrypt.hash(password, salt, function(err, hash) {
	    	User.create({
					username: username,
					email: email,
					password_hash: hash,
					role: 'NormalUser'
				})
				.exec(function(err, user){
					if (err) return res.negotiate(err);
					else{
						var responseData = {
							token: JWTService.generateJWT(user)
						}
					}
					return ResponseService.json(200, res, 1000, responseData);
				});
	    });
		});
	},

	login: function(req, res) {
		var params = req.params.all();
		var email = params.email;
		var password = params.password;
		User.findOne({
			email: email
		})
		.exec(function(err, user){
			if (err) return ResponseService.json(400, res, 1001, err.Errors);
			if (!user) return ResponseService.json(400, res, 1002);
			bcrypt.compare(password, user.password_hash, function(err, valid) {
			  if (err) return ResponseService.json(400, res, 1003, err.Errors);;
			  // valid === true
			  if(valid) {
			  	var responseData = {
					token: JWTService.generateJWT(user)
				}
			  	return ResponseService.json(200, res, 1004, responseData);
			  } else {
			  	return ResponseService.json(400, res, 1005);
			  }
			});
		});
	}
};

