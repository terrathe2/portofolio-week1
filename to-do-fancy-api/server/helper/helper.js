const crypto = require('crypto')
const jwt = require('jsonwebtoken')
const jwtDecode = require('jwt-decode');
const moment = require('moment')

module.exports = {
  mongoAuth: {
    auth: {
      authdb: 'admin'
    }
  },

  secretGenerate: () => {
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890'
    let secret = ""
    for (let i = 0; i < 6; i++) {
      secret += str[Math.floor(Math.random()*62)]
    }

    return secret;
  },

  secretHash: (key, password) => {
    const hash = crypto.createHmac('md5', key).update(password).digest('hex');

    return hash;
  },

  dataUser: (reqBody, secret, password) => {
    let Obj = {
      username: reqBody.username,
      password: password,
      secret: secret,
      email: reqBody.email,
      fb: null
    }

    return Obj;
  },

  dataTodo: (reqBody, userid) => {
    let Obj = {
      userid: userid,
      description: reqBody.description,
      createdAt: new Date(),
      status: ''
    }

    if(reqBody.deadline) {
      Obj.deadline = moment(reqBody.deadline).format('YYYY-MM-D')
    } else {
      Obj.deadline = null
    }

    return Obj
  },

  getId: function(token) {
    let decode = jwtDecode(token)

    return decode
  }

  // authenticate: (req, res, next) => {
  //   let secret = 'hacktiv8'
  //   let token = req.headers.token
  //   jwt.verify(token, secret, function(err, decoded) {
  //     if (err) {
  //       res.redirect('/users/login')
  //     } else {
  //       next()
  //     }
  //   });
  // }
};
