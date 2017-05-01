/**
 * PostController
 *
 * @description :: Server-side logic for managing posts
 * @help        :: See http://sailsjs.org/#!/documentation/concepts/Controllers
 */

module.exports = {
	/**
	 * Get all posts
	 * @param  {obj}  	req
	 * @param  {obj}	res
	 * @return {obj}
	 */
	getAllPosts: function(req, res) {
		Post.find()
		.populate('author')
		.populate('tags')
		.exec(function(err, posts){
			if(err) return ResponseService.json(400, res, 1500, err.Errors);
			if(posts.length === 0){
				// No post now
				return ResponseService.json(200, res, 1501);
			} else {
				var responseData = posts.map(function (onePost) {
					return {
						post_id: onePost.id,
						post_title: onePost.title,
						post_abstract: onePost.abstract,
						post_author: {
							username: onePost.author.username,
							email: onePost.author.email
						},
						post_tags: onePost.tags
					}
				});
				return ResponseService.json(200, res, 1502, responseData);
			}
		});
	},

	/**
	 * Get one post by its id
	 * @param  {obj}  	req
	 * @param  {obj}	res
	 * @return {obj}
	 */
	getPostById: function(req, res) {
		var params = req.params.all();
		var postID = params.postID;
		Post.findOne({
			id: postID
		})
		.populate('author')
		.populate('tags')
		.populate('comments')
		.exec(function(err, post){
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(!post){
				// Doesn't find that post
				return ResponseService.json(200, res, 1504);
			} else {
				var userObj = {
					email: post.author.email,
					username: post.author.username
				};
				post.author = userObj;
				return ResponseService.json(200, res, 1505, post);
			}
		});
	},

	/**
	 * Get posts by their tag
	 * @param  {obj}  	req
	 * @param  {obj}	res
	 * @return {obj}
	 */
	getPostByTag: function(req, res) {
		var params = req.params.all();
		var tagContent = params.tag;
		Tag.findOne({
			content: tagContent
		})
		.populate('posts')
		.exec(function(err, tag){
			if(err) return ResponseService.json(400, res, 1514, err.Errors);
			else {
				var posts = tag.posts;
				var retPostsArray = [];
				posts.forEach(function(post){
					Post.findOne({
						id: post.id
					})
					.populate('author')
					.populate('tags')
					.exec(function(err, onePost){
						var retPost = {
							post_id: onePost.id,
							post_title: onePost.title,
							post_abstract: onePost.abstract,
							post_author: {
								username: onePost.author.username,
								email: onePost.author.email
							},
							post_tags: onePost.tags
						};
						retPostsArray.push(retPost);
						if(retPostsArray.length === posts.length){
							return ResponseService.json(200, res, 1515, {posts: retPostsArray});
						}
					});
				});
			}
		});
	},

	/**
	 * Create a new post
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     id of the new post or just error message
	 */
	createPost: function(req, res) {
		var params = req.params.all();
		var title = params.title;
		var content = params.content;
		var tags = params.tags.split(',');
		var abstract = params.abstract;
		var authorEmail = params.email;
		// count the number of tags added
		var counter = 0;
		var tagIDs = [];
		// First check whether the post title already exists
		Post.findOne({
			title: title
		})
		.exec(function(err, post){
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(post) return ResponseService.json(200, res, 1506);
			else {
				// get the author
				User.findOne({
					email: authorEmail
				})
				.exec(function(err, user){
					if(err) return ResponseService.json(400, res, 1511, err.Errors);
					// create post
					Post.create({
						title: title,
						content: content,
						abstract: abstract,
						author: user.id
					})
					.exec(function(err, newPost){
						if(err) return ResponseService.json(400, res, 1507, err.Errors);
						tags.forEach(function(tag){
							Tag.findOrCreate({
								content: tag
							})
							.exec(function(err, oneTag){
								if(err) return ResponseService.json(400, res, 1508, err.Errors);
								// add post to tag
								oneTag.posts.add(newPost.id);
								oneTag.save(function(err){
									if(err) return ResponseService.json(400, res, 1509, err.Errors);
									else{
										tagIDs.push(oneTag.id);
										if(tagIDs.length === tags.length){
											newPost.tags.add(tagIDs);
											newPost.save(function(err){
												if(err) return ResponseService.json(400, res, 1510, err.Errors);
												return ResponseService.json(200, res, 1512, {postID: newPost.id});
											});
										}
									}
								});
							});
						});
					});
				});
			}
		});
	},

	/**
	 * Modify post. This function will not change one post's tag information.
	 * use addTagToPost and removeTagFromPost to modify tag
	 * @param  {obj} req 
	 * @param  {obj} res
	 * @return {obj}     success information or failure information
	 */
	modifyPost: function(req, res) {
		var params = req.params.all();
		var id = params.id;
		var title = params.title;
		var content = params.content;
		var abstract = params.abstract;
		// First check whether the post title already exists
		Post.findOne({
			title: title
		})
		.exec(function(err, post){
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(post) return ResponseService.json(200, res, 1506);
			else {
				// create post
				Post.update({
					id: id
				},{
					title: title,
					content: content,
					abstract: abstract
				})
				.exec(function(err, modifiedPost){
					if(err) return ResponseService.json(400, res, 1507, err.Errors);
					else {
						return ResponseService.json(200, res, 1513);
					}
				});
			}
		});
	},

	/**
	 * Add post to a user's collection or remove it from one's collection (for now just update post's likes attribute)
	 * @param {obj} req 
	 * @param {obj} res
	 * @return {obj}     success information or failure information
	 */
	updatePostWithCollection: function(req, res) {
		var params = req.params.all();
		var postID = params.postID;
		var addToCollection = params.addToCollection;
		Post.findOne({
			id: postID
		})
		.exec(function(err, post){
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(addToCollection){
				var newLikes = post.likes + 1;
			} else {
				var newLikes = post.likes - 1;
			}
			Post.update({id:postID},{likes:newLikes})
			.exec(function(err, updatedPost){
				if(err) return ResponseService.json(400, res, 1516, err.Errors);
				else {
					return ResponseService.json(200, res, 1517, updatedPost[0]);
				}
			});
		});
	},

	/**
	 * Search posts that contains the searchStr user input
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     Error message or the matched posts
	 */
	searchPosts: function(req, res) {
		var params = req.params.all();
		var searchStr = params.searchStr;
		Post.find({
			or: [
				{ title: { 'contains' : searchStr } },
				{ abstract: { 'contains' : searchStr } },
				{ content: { 'contains' : searchStr } },
			]
		})
		.populate('author')
		.populate('tags')
		.exec(function(err, posts){
			if(err) return ResponseService.json(400, res, 1518, err.Errors);
			if(posts.length === 0){
				// No matched post
				return ResponseService.json(200, res, 1519);
			} else {
				var responseData = posts.map(function (onePost) {
					return {
						post_id: onePost.id,
						post_title: onePost.title,
						post_abstract: onePost.abstract,
						post_author: {
							username: onePost.author.username,
							email: onePost.author.email
						},
						post_tags: onePost.tags
					}
				});
				return ResponseService.json(200, res, 1520, responseData);
			}
		});
	}

};

