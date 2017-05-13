/**
 * ContactController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {

	/**
	 * Get all advices
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     
	 */
	getAllAdvices: function (req, res) {
		Contact.find()
		.exec(function(err, advices){
			if (err) return ResponseService.json(400, res, 3002, err.Errors);
			if (!advices) return ResponseService.json(200, res, 3003);
			else {
				return ResponseService.json(200, res, 3004, advices);
			}
		});
	},

	/**
	 * Get one advice
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     
	 */
	getOneAdvice: function (req, res) {
		var params = req.params.all();
		var contactID = params.contactID;
		Contact.findOne({
			id: contactID
		})
		.exec(function(err, contact){
			if (err) return ResponseService.json(400, res, 3007, err.Errors);
			else {
				return ResponseService.json(200, res, 3008, contact);
			}
		});
	},

	/**
	 * Create a new advice
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     
	 */
	createAdvice: function (req, res) {
		var params = req.params.all();
		var email = params.email;
		var name = params.name;
		var selected = params.selected;
		var content = params.content;
		Contact.create({
			email: email,
			name: name,
			selected: selected,
			content: content
		})
		.exec(function(err, contact){
			if (err) return ResponseService.json(400, res, 3000, err.Errors);
			else {
				return ResponseService.json(200, res, 3001);
			}
		});
	},

	/**
	 * Delete an advice
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     
	 */
	deleteOneAdvice: function (req, res) {
		var params = req.params.all();
		var contactID = params.contactID;
		Contact.destroy({
			id: contactID
		})
		.exec(function(err){
			if (err) return ResponseService.json(400, res, 3005, err.Errors);
			else {
				Contact.find()
				.exec(function(err, advices){
					if (err) return ResponseService.json(400, res, 3002, err.Errors);
					if (!advices) return ResponseService.json(200, res, 3003);
					else {
						return ResponseService.json(200, res, 3006, advices);
					}
				});
			}
		});
	}

};