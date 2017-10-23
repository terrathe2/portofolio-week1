const helper = require('../helper/helper')
const mongoose = require('mongoose')
const url = "mongodb://admin:admin@localhost:27017/todo" // with mongoDB role authenticate
mongoose.connect(url, helper.mongoAuth)

const schema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  description: String,
  createdAt: Date,
  deadline: Date,
  status: String
})

const todos = mongoose.model('Todo', schema)

module.exports = todos;
