
const AuthorizationUserService = require('../../app/lib/authorization.user-service');
const UserInfoSession = require('../../app/models/user.info-session');





beforeEach(function(done) {
 // this.authorizationUserService.authorizedUser =[];
  done();
});

afterEach(() => {
});

describe('AuthorizationUserService', () => {

    it('should add authorization for an new User', function () {
      let authorizationUserService = new AuthorizationUserService();

      let userInfoSession = new UserInfoSession({userId:'user1',userToken: 'aaaaa'});
       authorizationUserService.addAuthorizationForThisUser(userInfoSession);

      expect( authorizationUserService.getAuthorizedUsers().length).toBe(1);
    });

  it('should add 3 auhorization for 3 different user', function () {
    let authorizationUserService = new AuthorizationUserService();


    let userInfoSession1 = new UserInfoSession({userId:'user1',userToken: 'aaaaa'});
    let userInfoSession2 = new UserInfoSession({userId:'user2',userToken: 'bbbbb'});
    let userInfoSession3 = new UserInfoSession({userId:'user3',userToken: 'ccccc'});

    authorizationUserService.addAuthorizationForThisUser(userInfoSession1);
    authorizationUserService.addAuthorizationForThisUser(userInfoSession2);
    authorizationUserService.addAuthorizationForThisUser(userInfoSession3);

    expect( authorizationUserService.getAuthorizedUsers().length).toBe(3);
  });

  it('should add authorization for the same userId but with an userToken different', function () {

    let authorizationUserService = new AuthorizationUserService();


    let userInfoSession1 = new UserInfoSession({userId:'user1',userToken: 'aaaaa'});
    let userInfoSession2 = new UserInfoSession({userId:'user1',userToken: 'bbbbb'});

    authorizationUserService.addAuthorizationForThisUser(userInfoSession1);
    authorizationUserService.addAuthorizationForThisUser(userInfoSession2);

    expect( authorizationUserService.getAuthorizedUsers().length).toBe(2);
  });


  it('should not add authorization for the same userId  with the same userToken ', function () {

    let authorizationUserService = new AuthorizationUserService();


    let userInfoSession1 = new UserInfoSession({userId:'user1',userToken: 'aaaaa'});
    let userInfoSession2 = new UserInfoSession({userId:'user1',userToken: 'aaaaa'});

    authorizationUserService.addAuthorizationForThisUser(userInfoSession1);
    authorizationUserService.addAuthorizationForThisUser(userInfoSession2);

    expect( authorizationUserService.getAuthorizedUsers().length).toBe(1);
  });

  it('should respond not null for AuthorizationUserService.isAuthorize for userInfoSession({userId:"user1",userToken: "aaaaa"})', function () {


    let authorizationUserService = new AuthorizationUserService();

    let userInfoSession = new UserInfoSession({userId:'user1',userToken: 'aaaaa'});
    authorizationUserService.addAuthorizationForThisUser(userInfoSession);

    expect(authorizationUserService.isAuthorizeUser(userInfoSession)).not.toBeNull();

  });


  it('should respond  null for AuthorizationUserService.isAuthorize for userInfoSession({})', function () {


    let authorizationUserService = new AuthorizationUserService();

    let userInfoSession = new UserInfoSession({userId:'user1',userToken: 'aaaaa'});
    let userInfoSession2 = new UserInfoSession({userId:'user1',userToken: 'bbbbb'});

    authorizationUserService.addAuthorizationForThisUser(userInfoSession);

    expect(authorizationUserService.isAuthorizeUser(userInfoSession2)).not.toBeDefined();

  });

  })

