const helper = require('../helper/helper')
const mongoose = require('mongoose')
const url = "mongodb://admin:admin@localhost:27017/todo" // with mongoDB role authenticate
mongoose.connect(url, helper.mongoAuth)

const schema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  secret: String,
  email: {
    type: String,
    required: true
  },
  fb: String
})

const users = mongoose.model('User', schema)

module.exports = users;
