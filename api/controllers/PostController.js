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
	 * Get top 5 posts
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     
	 */
	getTopPosts: function(req, res) {
		Post.find()
		.exec(function(err, posts){
			if(err) return ResponseService.json(400, res, 1500, err.Errors);
			if(posts.length === 0){
				// No post now
				return ResponseService.json(200, res, 1501);
			} else {
				posts.sort(PostService.sortFunction("clicks", -1));
				var responseData = posts.map(function (onePost) {
					return {
						post_id: onePost.id,
						post_title: onePost.title,
						post_clicks: onePost.clicks,
					}
				});
				responseData.splice(5);
				// Only return top 5 posts
				return ResponseService.json(200, res, 1521, responseData);
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
		.populate('collectors')
		.exec(function(err, post){
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(!post){
				// Doesn't find that post
				return ResponseService.json(200, res, 1504);
			} else {
				var clicks = post.clicks + 1;
				Post.update({
					id: postID
				},{
					clicks: clicks
				})
				.exec(function(err, newPost){
					if(err) return ResponseService.json(400, res, 1516, err.Errors);
					var userObj = {
						email: post.author.email,
						username: post.author.username
					};
					post.author = userObj;
					post.clicks = clicks;
					var collectors;
					if(!post.collectors){
						collectors = [];
					} else {
						collectors = post.collectors.map(function(user){
							return {email: user.email};
						});
					}
					return ResponseService.json(200, res, 1505, {post: post, collectors: collectors});
				});
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
	 * get posts by category
	 * @param  {obj} req 
	 * @param  {obj} res 
	 * @return {obj}     all the posts of a category
	 */
	getPostByCategory: function(req, res) {
		var params = req.params.all();
		var content = params.content;
		Category.findOne({
			content: content
		})
		.exec(function (err, category) {
			if (err) return ResponseService.json(400, res, 3203, err.Errors);
			else if (!category) return ResponseService.json(200, res, 3207);
			else {
				Post.find({
					category: category.id
				})
				.populate('author')
				.populate('tags')
				.exec(function (err, posts) {
					if (err) return ResponseService.json(400, res, 1529, err.Errors);
					else if (posts.length == 0) return ResponseService.json(200, res, 1530);
					else {
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
						return ResponseService.json(200, res, 1531, responseData);
					}
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
		var tags = params.tags.split(',').map( tag => tag.trim());
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
			if(post.id !== id) return ResponseService.json(200, res, 1506);
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
					if(err) return ResponseService.json(400, res, 1516, err.Errors);
					else {
						return ResponseService.json(200, res, 1513);
					}
				});
			}
		});
	},

	deletePost: function (req, res) {
		var params = req.params.all();
		var id = params.postID;
		Post.findOne({
			id: id
		})
		.exec(function (err, post) {
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			var categoryID = post.category;
			if (categoryID) {
				Category.findOne({
					id: categoryID
				})
				.exec(function (err, category) {
					if (err) return ResponseService.json(400, res, 3203, err.Errors);
					var numberofposts = category.numberofposts;
					Category.update({
						id: categoryID
					},{
						numberofposts: numberofposts-1
					})
					.exec(function (err, newCategory) {
						if (err) return ResponseService.json(400, res, 3208);
					});
				});
			}
			Post.destroy({
				id: id
			})
			.exec(function (err) {
				if (err) return ResponseService.json(400, res, 1525, err.Errors);
				else {
					Tag.find()
					.populate('posts')
					.exec(function (err, tags) {
						tags.forEach( function (tag, index, array) {
							if (tag.posts.length === 0) {
								Tag.destroy({
									id: tag.id
								})
								.exec(function (err) {
									if (err) return ResponseService.json(400, res, 1528, err.Errors);
									else {
										if (index === array.length-1) {
											return ResponseService.json(200, res, 1526);
										}
									}
								});
							} else if (index === array.length-1) {
								return ResponseService.json(200, res, 1526);
							}
						});
					});
				}
			});
		});
	},

	/**
	 * Add post to a user's collection or remove it from one's collection (for now just update post's likes attribute)
	 * @param {obj} req 
	 * @param {obj} res
	 * @return {obj}     success information or failure information
	 */
	updatePostWithLike: function(req, res) {
		var params = req.params.all();
		var postID = params.postID;
		var addOneLike = params.addOneLike;
		Post.findOne({
			id: postID
		})
		.exec(function(err, post){
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(addOneLike){
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

	updatePostWithCollection: function(req, res) {
		var params = req.params.all();
		var postID = params.postID;
		var addOneCollection = params.addOneCollection;
		var email = params.email;
		Post.findOne({
			id: postID
		})
		.exec(function(err, post){
			if(err) return ResponseService.json(400, res, 1503, err.Errors);
			if(addOneCollection){
				var newCollection = post.collections + 1;
			} else {
				var newCollection = post.collections - 1;
			}
			User.findOne({
				email: email
			})
			.exec(function(err, user){
				if (err) return ResponseService.json(400, res, 1001, err.Errors);
				if (!user) return ResponseService.json(200, res, 1002);
				Post.update({id:postID},{collections:newCollection})
				.exec(function(err, updatedPost){
					if(err) return ResponseService.json(400, res, 1516, err.Errors);
					else {
						var collectedPost = updatedPost[0];
						if(addOneCollection) {
							collectedPost.collectors.add(user);
						} else {
							collectedPost.collectors.remove(user.id);
						}
						collectedPost.save(function(err) {
							if (err) return ResponseService.json(400, res, 1522, err.Errors);
							else return ResponseService.json(200, res, 1523, collectedPost);
						});
					}
				});
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

