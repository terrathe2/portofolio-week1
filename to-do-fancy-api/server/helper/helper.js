const crypto = require('crypto')
const jwt = require('jsonwebtoken')

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
