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
    numberofposts: {
      type: 'integer',
      defaultsTo: 0
    }
  }

};