/**
 * CategoryController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * get all categories
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     all categories
	 */
	getAllCategories: function(req, res) {
		Category.find()
		.exec(function (err, categories) {
			if (err) return ResponseService.json(400, res, 3200, err.Errors);
			else if (categories.length === 0) return ResponseService.json(200, res, 3201);
			else {
				return ResponseService.json(200, res, 3202, categories);
			}
		});
	},

	/**
	 * create a new category
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     success message
	 */
	createCategory: function(req, res) {
		var params = req.params.all();
		var content = params.content;
		Category.findOne({
			content: content
		})
		.exec(function (err, category) {
			if (err) return ResponseService.json(400, res, 3203, err.Errors);
			else if (category) return ResponseService.json(200, res, 3204);
			else {
				Category.create({
					content: content
				})
				.exec(function (err, newCategory) {
					if (err) return ResponseService.json(400, res, 3205, err.Errors);
					else return ResponseService.json(200, res, 3206, newCategory);
				});
			}
		});
	},

	/**
	 * add a post to a category
	 * @param {obj} req 
	 * @param {obj} res 
	 */
	addPostToCategory: function(req, res) {
		var params = req.params.all();
		var content = params.content;
		var postID = params.postID;
		Post.findOne({
			id: postID
		})
		.exec(function (err, post) {
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(!post){
				// Doesn't find that post
				return ResponseService.json(200, res, 1504);
			} else {
				if (post.category != null) {
					Category.findOne({
						id: post.category
					})
					.exec(function (err, prevCategory) {
						var n = prevCategory.numberofposts;
						if (err) return ResponseService.json(400, res, 3203, err.Errors);
						else if (!prevCategory) return ResponseService.json(200, res, 3207);
						Category.update({
							id: post.category
						},{
							numberofposts: n-1
						})
						.exec(function (err, updatedPrevCategory) {
							if (err) return ResponseService.json(400, res, 3208);
						});
					});
				}
				Category.findOne({
					content: content
				})
				.exec(function (err, category) {
					if (err) return ResponseService.json(400, res, 3203, err.Errors);
					else if (!category) return ResponseService.json(200, res, 3207);
					else {
						var numberofposts = category.numberofposts;
						Post.update({
							id: postID
						},{
							category: category.id
						})
						.exec(function (err, post) {
							if (err) return ResponseService.json(400, res, 1516, err.Errors);
							else {
								Category.update({
									content: content
								},{
									numberofposts: numberofposts+1
								})
								.exec(function (err, updatedCategory) {
									if (err) return ResponseService.json(400, res, 3208);
									else return ResponseService.json(200, res, 3209);
								});
							}
						});
					}
				});
			}
		});
	},
};