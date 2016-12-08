const app = require('../../app');
const Picture = require('../../app/models/picture');
const ServerStorage = require('../../app/lib/filesystem-server-storage');
const PictureDbService = require('../../app/lib/database-picture-storage');
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

  xit('should return a list of picture', (done) => {
    const responseFS =  {
      user: 1,
      pictures:
        [
          {id : '1', title : 'image 1', url : 'test1.jpg'},
          {id : '2', title : 'image 2', url : 'test2.jpg'},
          {id : '3', title : 'image 3', url : 'test3.jpg'}
        ]
    }

    PictureDbService.prototype.findUsersPictures = jasmine.createSpy().andReturn(Promise.resolve(responseFS));
      request(app)
        .get('/api/v1/users/1/pictures')
        .expect('Content-Type', 'application/json')
        .expect(200)
        .end(function (err, response) {
         expect(response.body.user).toEqual(1);
         expect(response.body.pictures.length).toEqual(3);
         expect(response.body.pictures[0].id).toEqual(1);
         expect(response.body.pictures[1].id).toEqual(2);
          return done();
        });

      return done();
    });

  xit('should save a picture in database', (done) => {
    const pictureToSend={title:'test', fileData:'data:image/jpg;base64,IMAGE_DATA'};
    const responseFS = {id : '1', url : 'http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg'};
    ServerStorage.prototype.savePicture = jasmine.createSpy().andReturn(Promise.resolve(responseFS));
    request(app)
      .post('/api/v1/users/1/pictures')
      .send(pictureToSend)
      .expect(201) //201 =>created
      .end(function (err, response) {
        expect(err).toBeNull();
        expect(response.body.id).toEqual('1');
        expect(response.body.url).toEqual('http://m9.i.pbase.com/o6/53/623853/1/131283669.nHMCHWU8.smileyuplo_vector.jpg');
        expect(response.body.title).toEqual('test');
        return done();
      });
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

  xit('should respond a 430 because user {userLogin:"tribilik",userPassword:"mdp"} is not authorize', (done) => {
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
