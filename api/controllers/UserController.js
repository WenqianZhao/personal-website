/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */
var bcrypt = require('bcrypt');

module.exports = {
	/**
	 * Modify a user
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     return response object2
	 */
	modify: function(req, res) {
		var params = req.params.all();
		var email = params.email;
		var firstname = params.firstname;
		var lastname = params.lastname;
		var age = params.age;
		var gender = params.gender;
		User.update({
			email: email
		},{
			firstname: firstname,
			lastname: lastname,
			age: age,
			gender: gender
		})
		.exec(function(err, users){
			if (err) return ResponseService.json(400, res, 1008, err.Errors);
			if (!users) return ResponseService.json(200, res, 1002);
			var responseData = {
				token: JWTService.generateJWT(users[0])
			}
		  	return ResponseService.json(200, res, 1009, responseData);
		});
	},

	/**
	 * Change password
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     
	 */
	changePassword: function(req, res) {
		var params = req.params.all();
		var email = params.email;
		var oldpassword = params.oldpassword;
		var newpassword = params.newpassword;
		var saltRounds = 10;
		User.findOne({
			email: email
		})
		.exec(function(err, user) {
			if (err) return ResponseService.json(400, res, 1001, err.Errors);
			if (!user) return ResponseService.json(200, res, 1002);
			bcrypt.compare(oldpassword, user.password_hash, function(err, valid) {
			  if (err) return ResponseService.json(200, res, 1003, err.Errors);;
			  // valid === true
			  if(valid) {
			  	// update password
			  	bcrypt.genSalt(saltRounds, function(err, salt) {
				    bcrypt.hash(newpassword, salt, function(err, hash) {
				    	User.update({
				    		email: email
				    	},{
				    		password_hash: hash
				    	})
				    	.exec(function (err, users) {
				    		if(err) return ResponseService.json(400, res, 1010, err.Errors);
				    		if (!users) return ResponseService.json(200, res, 1002);
				    		else{
								var responseData = {
									token: JWTService.generateJWT(users[0])
								};
							}
							return ResponseService.json(200, res, 1011, responseData);
				    	});
				    });
				});
			  } else {
			  	return ResponseService.json(200, res, 1005);
			  }
			});
		});
	},

	getAllCollections: function(req, res) {
		var params = req.params.all();
		var email = params.email;
		User.findOne({
			email: email
		})
		.populate('collections')
		.exec(function(err, user){
			if (err) return ResponseService.json(400, res, 1001, err.Errors);
			if (!user) return ResponseService.json(200, res, 1002);
			else {
				var responseData = [];
				if (user.collections) {
					user.collections.forEach(function(collection, index, array){
						Post.findOne({
							id: collection.id
						})
						.populate('author')
						.populate('tags')
						.exec(function(err, onePost){
							var postObj = {
								post_id: onePost.id,
								post_title: onePost.title,
								post_abstract: onePost.abstract,
								post_author: {
									username: onePost.author.username,
									email: onePost.author.email
								},
								post_tags: onePost.tags
							}
							responseData.push(postObj);
							if (index === array.length - 1) {
								return ResponseService.json(200, res, 2700, responseData);
							}
						});
					});
				} else {
					return ResponseService.json(200, res, 2700, responseData);
				}
			}
		}); 
	},
};
