/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

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
};