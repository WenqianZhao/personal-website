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
    isRoot: {
      type: 'boolean',
      defaultsTo: false
    },
    repliedbycomment: {
      model: 'comment'
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