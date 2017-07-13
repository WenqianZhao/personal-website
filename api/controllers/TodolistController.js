/**
 * TodolistController
 *
 * @description :: Server-side logic for managing tags
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * Get all todolist items of a user
	 * @param  {obj}  	req
	 * @param  {obj}	res
	 * @return {obj}
	 */
	getAllItems: function(req, res) {
		var params = req.params.all();
		var email = params.email;
		var itemClass = params.itemClass;
		User.findOne({
			email: email
		})
		.exec(function (err, user) {
			if (err) return ResponseService.json(400, res, 1001, err.Errors);
			else{
				Todolist.find({
					owner: user.id,
					listclass: itemClass
				})
				.exec(function (err, todolists) {
					if (err) return ResponseService.json(400, res, 3100, err.Errors);
					if (todolists.length === 0) {
						// No todolist for such user
						return ResponseService.json(200, res, 3101);
					} else {
						var responseData = todolists.map(function (item) {
							return {
								id: item.id,
								content: item.content,
								deadline: item.deadline,
								importance: item.importance
							}
						});
						return ResponseService.json(200, res, 3102, responseData);
					}
				});
			}
		});
	},

	addItemToList: function(req, res) {
		var params = req.params.all();
		var email = params.email;
		var content = params.content;
		var importance = params.importance;
		var deadline = params.deadline;
		User.findOne({
			email: email
		})
		.exec(function (err, user) {
			if (err) return ResponseService.json(400, res, 1001, err.Errors);
			else{
				Todolist.create({
					content: content,
					owner: user,
					deadline: deadline,
					importance: importance,
					listclass: 'toDoList'
				})
				.exec(function (err, todolist) {
					if (err) return ResponseService.json(400, res, 3103, err.Errors);
					return ResponseService.json(200, res, 3104, todolist);
				});
			}
		});
	},

	modifyItem: function (req, res) {
		var params = req.params.all();
		var id = params.id;
		var content = params.content;
		Todolist.update({
			id: id
		},{
			content: content
		})
		.exec(function (err, todolist) {
			if (err) return ResponseService.json(400, res, 3105, err.Errors);
			return ResponseService.json(200, res, 3106, todolist);
		}); 
	}
}