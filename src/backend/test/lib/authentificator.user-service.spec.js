

const app = require('../../app');

const AuthenticatorUserService = require('../../app/lib/authentificator.user-service');

const authenticatorUserService = new AuthenticatorUserService();




describe('AuthentificatorUserService', (done) => {
  xit('function authentificate({login:"user1",mdp:"admin"}) should resolve promise with just the user in response', function (done) {


   authenticatorUserService.authentificateUser({userLogin:'user1',userPassword:'admin'}).then(
     response=>{
      console.log(response);
      expect(response.userLogin).toEqual('user1');
      expect(response.userPassword).toEqual('admin');
      done();
   })

    done();
  });


xit('function authentificate("tribilik","mdp") should reject promise', function (done) {
  authenticatorUserService.authentificateUser({userLogin:'tribilik',userPassword:'admin'}).catch( response =>{

    expect(response).not.toBeNull();

  })
  done();
});



});
