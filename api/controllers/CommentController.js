/**
 * CommentController
 *
 * @description :: Server-side logic for managing comments
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * get all comments of one post
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     all comments of the post
	 */
	getAllComments: function(req, res) {
		var params = req.params.all();
		var postID = params.postID;
		Comment.find({
			post: postID
		})
		.populate('commentby')
		.exec(function(err, comments){
			if (err) return ResponseService.json(400, res, 2200, err.Errors);
			else {
				var responseData = comments.map(function(comment){
					return {
						id: comment.id,
						content: comment.content,
						commentby: {
							username: comment.commentby.username,
							email: comment.commentby.email
						},
						post: comment.post,
						isRoot: comment.isRoot,
						replytocomment: comment.replytocomment,
						likes: comment.likes,
						dislikes: comment.dislikes
					}
				});
				return ResponseService.json(200, res, 2202, responseData);
			}
		});
	},

	addRootComment: function(req, res) {
		var params = req.params.all();
		var postID = params.postID;
		var email = params.email;
		var content = params.content;
		User.findOne({
			email: email
		})
		.exec(function(err, user){
			if (err) return ResponseService.json(400, res, 1001, err.Errors);
			if (!user) return ResponseService.json(200, res, 1002);
			Comment.create({
				content: content,
				commentby: user.id,
				post: postID,
				isRoot: true
			})
			.exec(function(err, newComment){
				if (err) return ResponseService.json(400, res, 2203, err.Errors);
				Comment.findOne({
					id: newComment.id
				})
				.populate('commentby')
				.exec(function(err, comment){
					var responseData = {
						id: comment.id,
						content: comment.content,
						commentby: {
							username: comment.commentby.username,
							email: comment.commentby.email
						},
						post: comment.post,
						isRoot: comment.isRoot,
						replytocomment: comment.replytocomment,
						likes: comment.likes,
						dislikes: comment.dislikes
					};
					return ResponseService.json(200, res, 2202, responseData);
				});
			});
		});
	}
};