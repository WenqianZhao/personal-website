module.exports = {

  attributes: {
  	id: {
  		type: 'integer',
  		primaryKey: true,
      autoIncrement: true
  	},
  	content: {
      type: 'string',
      required: true,
      unique: true
    },
    posts: {
      collection: 'post',
      via: 'tags'
    }
  }
};