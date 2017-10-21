const User = require('../models/user')
const helper = require('../helper/helper')
const jwt = require('jsonwebtoken');

module.exports = {
  login: (req, res) => {
    User.findOne({username: req.body.username}).then((result) => {
      if (result) {
        let password = helper.secretHash(result.secret, req.body.password)
        if (password === result.password) {
          let token = jwt.sign({
            username: result.username
          }, 'hacktiv8');
          res.json({
            message: "Berhasil login",
            data: token
          })
        } else {
          res.json({
            message: "sorry, Wrong password"
          })
        }
      } else {
        res.json({
          message: "Sorry, Username is invalid"
        })
      }
    })
  },

  register: (req, res) => {
    let secret = helper.secretGenerate()
    let secretPassword =  helper.secretHash(secret, req.body.password)

    User(helper.dataUser(req.body, secret, secretPassword)).save().then((rowUser) => {
      let token = jwt.sign({
        username: rowUser.username
      }, 'hacktiv8');

      res.json({
        message: "Berhasil Register",
        data: token
      })
    }).catch((reason) => {
      res.json({
        message: reason.message
      })
    })
  }
};
