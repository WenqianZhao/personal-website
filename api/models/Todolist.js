module.exports = {

  attributes: {
  	id: {
  		type: 'integer',
  		primaryKey: true,
      autoIncrement: true
  	},
    content: {
      type: 'string',
      required: true
    },
  	owner: {
      model: 'user'
    },
    deadline: {
      type: 'date'
    },
    importance: {
      type: 'string',
      enum: ['High', 'Middle', 'Low'],
      required: true
    },
    listclass: {
      type: 'string',
      enum: ['toDoList', 'haveDone', 'overTime'],
      required: true
    }
  }
};