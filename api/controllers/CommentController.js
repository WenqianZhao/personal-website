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

	/**
	 * add a root comment of one post
	 * @param {obj} req 
	 * @param {obj} res 
	 */
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
	},

	/**
	 * update the likes field of a comment
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     success or not
	 */
	updateCommentLikes: function(req, res) {
		var params = req.params.all();
		var commentID = params.commentID;
		var newLikes = params.newLikes;
		Comment.update({
			id: commentID
		},{
			likes: newLikes
		})
		.exec(function(err, updatedComment){
			if (err) return ResponseService.json(400, res, 2207, err.Errors);
			else {
				Comment.findOne({
					id: commentID
				})
				.populate('commentby')
				.exec(function(err, comment){
					if (err) return ResponseService.json(400, res, 2205, err.Errors);
					if (!comment) return ResponseService.json(200, res, 2206);
					else {
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
						return ResponseService.json(200, res, 2208, responseData);
					}
				});
			}
		});
	},

	/**
	 * update the dislikes field of a comment
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     success or not
	 */
	updateCommentDisLikes: function(req, res) {
		var params = req.params.all();
		var commentID = params.commentID;
		var newDislikes = params.newDislikes;
		Comment.update({
			id: commentID
		},{
			dislikes: newDislikes
		})
		.exec(function(err, updatedComment){
			if (err) return ResponseService.json(400, res, 2207, err.Errors);
			else {
				Comment.findOne({
					id: commentID
				})
				.populate('commentby')
				.exec(function(err, comment){
					if (err) return ResponseService.json(400, res, 2205, err.Errors);
					if (!comment) return ResponseService.json(200, res, 2206);
					else {
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
						return ResponseService.json(200, res, 2208, responseData);
					}
				});
			}
		});
	},

};