const helper = require('../helper/helper')
const mongoose = require('mongoose')
const url = "mongodb://admin:admin@localhost:27017/todo" // with mongoDB role authenticate
mongoose.connect(url, helper.mongoAuth)

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    ref: 'User'
  }
  description: String,
  createdAt: Date,
  deadline: Date,
})

const todos = mongoose.model('Todo', schema)

module.exports = todos;
