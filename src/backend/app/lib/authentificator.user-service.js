const UserInfoAccount = require('../models/user.info-account');

class AuthenticatorUserService {

  constructor() {
    this.authorizedUsers = [
     {userLogin: 'user1', userPassword: 'admin'},
      {userLogin: 'user2', userPassword: 'test'},
      {userLogin: 'foo', userPassword: 'bar'},
      {userLogin: '', userPassword: ''} //For tests
    ]
  }

  authentificateUser(userInfoAccount) {

    return new Promise((resolve, reject) => {
      let userFoundInDatabase = this.authorizedUsers.find(user => {

         return (user.userLogin === userInfoAccount.userLogin)
           && (user.userPassword === userInfoAccount.userPassword)

      });

      if (userFoundInDatabase == undefined) {

        reject(new Error);
      }
      else{

        resolve(userInfoAccount);
      }

    })
  }
};

module.exports = AuthenticatorUserService;
