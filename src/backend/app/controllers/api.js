let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');

const UserService = require( '../../app/lib/user-service' );
const AuthentificationUserService = require( '../../app/lib/authentificator.user-service' );
const AuthorizationUserService = require( '../../app/lib/authorization.user-service' );
const UserInfoAccount = require( '../../app/models/user.info-account' );



const serverStorage = new ServerStorage();
const userService = new UserService();
const authentificationUserService = new AuthentificationUserService();
const authorizationUserService = new AuthorizationUserService();

module.exports = function (app) {
  app.use('/api/v1', router);
};


//User creation
router.post('/users/', function (req, res, next) {

  let userId = req.params.userId;
  let userPwd = req.params.userPwd;

})

//User login

router.get('/users', function (req, res, next) {


  let userInfoAccount = new UserInfoAccount({
    userLogin: req.headers.userlogin,
    userPassword: req.headers.userpassword
  });


  authentificationUserService.authentificateUser(userInfoAccount).then(
    ( userAuthentified ) => {

     // console.log('userAuthentified : ',userAuthentified);

      let userInfoSession =
        userService.generateToken(userAuthentified.userLogin);

      // console.log('userInfoSession : ',userInfoSession);

      //  if(! authentificationUserService.agit )
      // TODO store userInfoSession in AuthorizeUserService
      res.status(230).send(userInfoSession);
    })

    .catch(
      ( err ) => {

        res.status(430).send(err);  //TODO get error login or password incorrect

      }
    )
})

