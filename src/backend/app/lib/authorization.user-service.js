class AuthorizationUserService {


  constructor() {

    this.authorizedUser = [];
  }

  getAuthorizedUsers(){
    return this.authorizedUser;
  }

  /**
   * Search if this userInfoSession.userId is already Authorize
   * @param userInfoSession
   * @private
   */
  isAuthorizeUser(userInfoSession) {
    return this.authorizedUser.find(user => {

      return (user.userLogin === userInfoSession.userLogin)
        && (user.userToken === userInfoSession.userToken)

    });
  }

  // TODO method that remove right of an user after a certain amount of time
  removeAuthorizationForThisUser(userInfoSession) {

  }


  addAuthorizationForThisUser(userInfoSession) {

    if (this.isAuthorizeUser(userInfoSession)) {
      return null;
    }

    this.authorizedUser.push(userInfoSession);

    return userInfoSession;
  }

}

module.exports = AuthorizationUserService;
