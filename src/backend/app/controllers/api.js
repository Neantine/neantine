let express = require('express');
let router = express.Router();

let bodyParser = require('body-parser');

const ServerStorage = require('../lib/filesystem-server-storage');
const PDbService = require('../lib/database-picture-storage');

const UserService = require( '../../app/lib/user-service' );
const AuthentificationUserService = require( '../../app/lib/authentificator.user-service' );
const AuthorizationUserService = require( '../../app/lib/authorization.user-service' );
const UserInfoAccount = require( '../../app/models/user.info-account' );



const pictureDbService = new PDbService();
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




router.get('/users/:userId/gallery', function (req, res, next) {


  let userId = req.params.userId;
  console.log('API ROUTER GET /users/:userId/gallery ', userId);

  pictureDbService.findUsersPictures(userId).then( (result)=>
  {
    if (result == null)
    {
      res.status(500).send("DB error: can't get user pictures");
      return;
    }

    let resultWithUrl = result.map( (pic) => {
     // console.log('mapping ', pic);
      return {
        url : serverStorage.getUrl(pic.pictureId),
        id : pic.pictureId,
        title : pic.pictureTitle}
    });

    let resultWithUserAndUrl =
    {
      user : userId,
      pictures : resultWithUrl
    };

    res.status(200).send(resultWithUserAndUrl);

  }).catch(
    ( err ) => {

    res.status(500).send(err);
    //TODO error handler

  })

});

router.post('/users/:userId/gallery/', function (req, res, next) {
//  console.log("API Router Post ")
  let bodyReqTitle = req.body.title;
  let bodyReqPictureData = req.body.fileData;
  let userId = req.params.userId;
  let response = null;

  serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then(

    (fileInfo) => {

      return pictureDbService.addPicture({
        userId:userId,
        pictureId : fileInfo.id,
        pictureTitle: bodyReqTitle,
        pictureFileStore: 'storage-type-server'
      })
    }).then((data) => {

    response = {id: data.pictureId, url: serverStorage.getUrl(data.pictureId), title: data.pictureTitle};
    // console.log(res);
    res.status(201).send(response);
  })
    .catch(err => {
      // console.log("save picture error: ", err);
      res.status(500);  //TODO get error status from db service & server storage
      return err;
    });


})
