const FB = require('fb')

class Facebook{
  static userData(token){
    return new Promise((resolve, reject) => {
      var fb = new FB.Facebook({
        accessToken: token,
        appId: 195417424336474,
        appSecret: 'b7f365d595f51d24f5ecec7d6bed0a5a'
      })

      fb.api('/me', 'get', { access_token: token, fields: 'id,first_name,email' }, function(response) {
        resolve(response)
      });
    });
  }
}

module.exports = Facebook
