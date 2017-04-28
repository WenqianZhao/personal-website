module.exports = {

  attributes: {
  	id: {
  		type: 'integer',
  		primaryKey: true,
      autoIncrement: true
  	},
    content: {
      type: 'text',
      required: true
    },
  	commentby: {
      model: 'user'
    },
    post: {
      model: 'post'
    },
    repliedbycomment: {
      model: 'comment',
      unique: true
    },
    replytocomment: {
      collection: 'comment',
      via: 'repliedbycomment'
    },
    likes: {
      type: 'integer',
      defaultsTo: 0
    },
    dislikes: {
      type: 'integer',
      defaultsTo: 0
    }
  }
};