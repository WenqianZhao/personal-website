/**
 * Route Mappings
 * (sails.config.routes)
 *
 * Your routes map URLs to views and controllers.
 *
 * If Sails receives a URL that doesn't match any of the routes below,
 * it will check for matching files (images, scripts, stylesheets, etc.)
 * in your assets directory.  e.g. `http://localhost:1337/images/foo.jpg`
 * might match an image file: `/assets/images/foo.jpg`
 *
 * Finally, if those don't match either, the default 404 handler is triggered.
 * See `api/responses/notFound.js` to adjust your app's 404 logic.
 *
 * Note: Sails doesn't ACTUALLY serve stuff from `assets`-- the default Gruntfile in Sails copies
 * flat files from `assets` to `.tmp/public`.  This allows you to do things like compile LESS or
 * CoffeeScript for the front-end.
 *
 * For more information on configuring custom routes, check out:
 * http://sailsjs.org/#!/documentation/concepts/Routes/RouteTargetSyntax.html
 */

module.exports.routes = {

  /***************************************************************************
  *                                                                          *
  * Make the view located at `views/homepage.ejs` (or `views/homepage.jade`, *
  * etc. depending on your default view engine) your home page.              *
  *                                                                          *
  * (Alternatively, remove this and add an `index.html` file in your         *
  * `assets` directory)                                                      *
  *                                                                          *
  ***************************************************************************/

  '/': {
    view: 'homepage'
  },
  '/zh-cn': {view: 'homepage-cn'},
  'get /login': {view : 'auth/login'},
  'get /signup': {view : 'auth/signup'},

  'post /token/refresh': 'AuthController.refreshToken',
  'post /login': 'AuthController.login',
  'post /signup': 'AuthController.signup',

  'post /user/modify': 'UserController.modify',
  'post /user/changepwd': 'UserController.changePassword',
  'post /user/getallcollections': 'UserController.getAllCollections',
  'get /user/getall': 'UserController.getAllUsers',

  'get /posts/getall': 'PostController.getAllPosts',
  'get /posts/gettop': 'PostController.getTopPosts',
  'post /posts/getone': 'PostController.getPostById',
  'post /posts/getbytag': 'PostController.getPostByTag',
  'post /posts/create': 'PostController.createPost',
  'post /posts/modify': 'PostController.modifyPost',
  'post /posts/delete': 'PostController.deletePost',
  'post /posts/updatelike': 'PostController.updatePostWithLike',
  'post /posts/updatecollect': 'PostController.updatePostWithCollection',
  'post /posts/search': 'PostController.searchPosts',

  'get /tags/getall': 'TagController.getAllTags',

  'post /comments/getbypost': 'CommentController.getAllComments',
  'post /comments/add/root': 'CommentController.addRootComment',
  'post /comment/update/like': 'CommentController.updateCommentLikes',
  'post /comment/update/dislike': 'CommentController.updateCommentDisLikes',
  'post /comments/add/chain': 'CommentController.addChainComment',

  'get /contact/getall': 'ContactController.getAllAdvices',
  'post /contact/add': 'ContactController.createAdvice',
  'post /contact/delete': 'ContactController.deleteOneAdvice',
  'post /contact/getone': 'ContactController.getOneAdvice',

  'post /app/todolist/getallitems': 'TodolistController.getAllItems',
  'post /app/todolist/addnewitem': 'TodolistController.addItemToList',
  'post /app/todolist/modifyitem': 'TodolistController.modifyItem',

  /***************************************************************************
  *                                                                          *
  * Custom routes here...                                                    *
  *                                                                          *
  * If a request to a URL doesn't match any of the custom routes above, it   *
  * is matched against Sails route blueprints. See `config/blueprints.js`    *
  * for configuration options and examples.                                  *
  *                                                                          *
  ***************************************************************************/

};
