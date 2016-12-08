const UserInfoSession = require('../models/user.info-session');


  let shortid = require('shortid');

class UserService {

  constructor() {
  }

  generateToken(userId){

    let uniqueID = shortid.generate();

    return new UserInfoSession({userId : userId, userToken: uniqueID});

    }

};

module.exports = UserService;
