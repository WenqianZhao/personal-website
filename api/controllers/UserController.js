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
					return res.json(200, {token: JWTService.generateJWT(user)});
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
			if (err) throw err;
			if (!user) return res.json(401, {err: 'Could not find user.'});
			bcrypt.compare(password, user.password_hash, function(err, valid) {
			  if (err) return res.negotiate(err);;
			  // valid === true
			  if(valid) {
					return res.json(200, {token: JWTService.generateJWT(user)});
			  } else {
			  	return res.json(401, {err: 'Wrong Password.'});
			  }
			});
		});
	}
};

