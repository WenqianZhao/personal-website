/**
 * User.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/documentation/concepts/models-and-orm/models
 */

module.exports = {

  attributes: {
  	id: {
  		type: 'integer',
  		primaryKey: true
  	},
  	username: {
  		type: 'string',
  		size: 20,
  		unique: true,
  		required: true
  	},
  	password_hash: {
  		type: 'string',
  		required: true
  	},
  	email: {
  		type: 'string',
  		unique: true,
  		required: true
  	},
  	firstname: {
  		type: 'string',
  		defaultsTo: null
  	},
  	lastname: {
  		type: 'string',
  		defaultsTo: null
  	},
  	age: {
  		type: 'integer',
  		defaultsTo: null
  	},
  	role: {
  		type: 'string',
  		enum: ['Admin', 'NormalUser']
  	},
  }
};

