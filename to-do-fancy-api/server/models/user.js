const helper = require('../helper/helper')
const mongoose = require('mongoose')
// const url = "mongodb://admin:admin@localhost:27017/todo" // with mongoDB role authenticate
const url = "mongodb://terrathe2:terrathe2@ds237815.mlab.com:37815/portofolio"
// mongoose.connect(url, helper.mongoAuth)
mongoose.connect(url)

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
  }
})

const users = mongoose.model('User', schema)

module.exports = users;
