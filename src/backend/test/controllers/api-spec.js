const app = require('../../app');
const ServerStorage = require('../../app/lib/filesystem-server-storage');
const request = require('supertest');

describe('App ', () => {
  let ServerStorageSavePictureBackup;
  let PictureDbServicefindUsersPicturesBackup;

  beforeEach(function(done) {
    Picture.remove({},  (err) => {
      if(err){throw err;}
      done();
    });

    ServerStorageSavePictureBackup = ServerStorage.prototype.savePicture;
    PictureDbServicefindUsersPicturesBackup = PictureDbService.prototype.findUsersPictures;
  });

  afterEach(() => {

    ServerStorage.prototype.savePicture = ServerStorageSavePictureBackup;
    PictureDbService.prototype.findUsersPictures = PictureDbServicefindUsersPicturesBackup;

  });



  xit('should authentificate the user {userLogin:"user1",userPassword:"admin"}and respond with a status 230 and {userId:"user1",userToken:"xxx"}', (done) => {
    request(app)
      .get('/api/v1/users')
      // TODO set headers
      .set({userLogin:'user1'})
      .set({userPassword:'admin'})
      .send()
      .expect(230) //201 =>created
      .end(function (err, response) {

        expect(response.body.userId).toEqual('user1');
        expect(response.body.userToken).not.toBeNull();

        return done();
      });
  });

  xit('should respond a 430 because user {userLogin:"tribilik",userPassword:"mdp"} is not authorized', (done) => {
    request(app)
      .get('/api/v1/users')
      // TODO set headers
      .set({userLogin:'tribilik'})
      .set({userPassword:'mdp'})
      .send()
      .expect(430) //430 =>login or password incorrect
      .end(function (err, response) {})
    done();
  });

});
