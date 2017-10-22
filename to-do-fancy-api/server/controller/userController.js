const User = require('../models/user')
const Facebook = require('../models/facebook')
const helper = require('../helper/helper')
const jwt = require('jsonwebtoken');

module.exports = {
  findAll: (req, res) => {
    User.find().then((rowsUser) => {
      res.json({
        message: "Berhasil Tampil",
        data: rowsUser
      })
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  },

  fblogin: (req, res) => {
    Facebook.userData(req.body.token).then((results) => {
      results.username = results.id
      results.password = results.first_name
      User.findOne({username: results.id}).then((rowUser) => {
        if (rowUser) {
          let token = jwt.sign({
            id: rowUser._id,
            username: rowUser.username
          }, 'hacktiv8');
          res.json({
            message: "Berhasil login",
            data: token
          })
        } else {
          let secret = helper.secretGenerate()
          let secretPassword =  helper.secretHash(secret, results.password)
          User(helper.dataUser(results, secret, secretPassword)).save().then((result) => {
            // console.log(result);
            let token = jwt.sign({
              id: result._id,
              username: result.username
            }, 'hacktiv8');

            res.json({
              message: "Berhasil Register",
              data: token
            })
          }).catch((reason) => {
            res.json({
              message: reason
            })
          })
        }
      })
    })
  },

  login: (req, res) => {
    User.findOne({username: req.body.username}).then((result) => {
      // console.log(result);
      if (result) {
        let password = helper.secretHash(result.secret, req.body.password)
        if (password === result.password) {
          let token = jwt.sign({
            id: result._id,
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
        id: rowUser._id,
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
  },

  delete: (req, res) => {
    User.remove({_id: req.params.id}).then((rowUser) => {
    // console.log(rowTodo);
      if (rowUser.result.n != 0) {
        res.json({
          message: "Berhasil Hapus",
          data: rowUser
        })
      } else {
        res.json({
          message: "Maaf tidak ada Id tersebut"
        })
      }
    }).catch((reason) => {
      res.json({
        message: reason
      })
    })
  }
};
