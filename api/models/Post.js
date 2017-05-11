/**
 * Post.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {
  attributes: {
  	id: {
  		type: 'integer',
  		primaryKey: true,
      autoIncrement: true
  	},
  	title: {
  		type: 'string',
  		required: true,
  		unique: true,
  	},
  	author: {
  		model: 'user'
  	},
  	tags: {
  		collection: 'tag',
  		via: 'posts'
  	},
  	content: {
  		type: 'longtext',
  		required: true
  	},
  	abstract: {
  		type: 'text',
  		required: true
  	},
  	clicks: {
  		type: 'integer',
  		defaultsTo: 0
  	},
  	likes: {
  		type: 'integer',
  		defaultsTo: 0
  	},
    collections: {
      type: 'integer',
      defaultsTo: 0
    },
  	reposts: {
  		type: 'integer',
  		defaultsTo: 0
  	},
  	comments: {
  		collection: 'comment',
  		via: 'post'
  	},
    collectors: {
      collection: 'user',
      via: 'collections'
    }
  }
};

