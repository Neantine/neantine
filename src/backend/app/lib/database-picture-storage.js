const Picture = require('../models/picture');

class PictureDbService {

  constructor() {
  }

  /**
   *
   * @param pictureInfo {userId:userId,pictureId :generatedFileName, pictureTitle: bodyReqTitle, pictureFileStore: 'storageTypeServer'}
   * @returns {Promise}
   */
  addPicture(pictureInfo) {
    return new Promise((resolve, reject) => {
      Picture.create({userId : pictureInfo.userId, pictureId:  pictureInfo.pictureId, pictureTitle:  pictureInfo.pictureTitle, pictureFileStore: pictureInfo.pictureFileStore}, (err) => {
        if (err) {
          reject("Error during the adding of picture in database: ", err);
        }
        else {
          resolve({userId : pictureInfo.userId, pictureId:  pictureInfo.pictureId, pictureTitle:  pictureInfo.pictureTitle, pictureFileStore: pictureInfo.pictureFileStore})
        }
      })
    });
  };

  /**
   *
   * @returns {Promise}
   */
  findUsersPictures(userId) {

    console.log("findUsersPictures ", userId);

    return new Promise((resolve, reject) => {

     // console.log(userId);

      Picture.find({userId:userId}, (err, pictures) => {
        if (err) {
          reject( err);
        }
        else {
          //console.log("findUsersPictures:", pictures);
          resolve(pictures);
        }
      });
    })
  };

  /*
   Retrieve a specific picture by id
   */
  findPictureById(id, cb) {
    return new Promise((resolve, reject) => {
      Picture.findOne({pictureId: id}, (err, pictures) => {
        if (err) {
          reject("Error during the retrieving of the picture of Id from the database: ", err);
        }
        else {
          resolve(pictures);
        }
      });
    })
  }
}

module.exports = PictureDbService;
