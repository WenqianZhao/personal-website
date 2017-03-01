/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	signup: function(req, res) {
		var username = req.param('username');
		var email = req.param('email');
		var password = req.param('password');
		User.create({
			username: username,
			email: email,
			password: password,
			role: 'NormalUser'
		})
		.exec(function(err, user){
			if (err) throw err;
			return res.redirect('/');
		});
	},

	login: function(req, res) {
		var email = req.param('email');
		var password = req.param('password');
		User.findOne({
			email: email
		})
		.exec(function(err, user){
			if (err) throw err;
			if (!user) return res.notFound('Could not find user.');
			console.log(user.username);
			return res.redirect('/');
		});
	}
};

