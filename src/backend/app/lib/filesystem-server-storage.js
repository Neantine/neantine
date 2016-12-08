const fs = require('fs');
let shortid = require('shortid');
const path = require("path");
const url = require('url');


function createDir(filePath) {

  filePath = path.dirname(filePath);
  console.log('create dir ',filePath );

  if (checkExist(filePath)) {
    return true;
  }
  checkExist(filePath);
  fs.mkdirSync(filePath);
}

function checkExist(path) {
  console.log('checkExist ',path );

  try {
    return fs.statSync(path).isDirectory();
  }
  catch (err) {
    return false;
  }
}

class ServerStorage {

  constructor() {


    this.picturesPath = '../../../../dist/upload/';
    this.serverType = 'local';
  }


  savePicture(bodyReqTitle, bodyReqPictureData) {

    return new Promise((resolve, reject) => {

      //Create base64 decoded buffer
      let picData = bodyReqPictureData.replace(/^data:image\/\w+;base64,/, "");
      let decodedPicData = new Buffer(picData, 'base64');

      let uniqueID = shortid.generate();
      let generatedFileName = bodyReqTitle + '' + uniqueID + ".jpg";

      let fileName = this.picturesPath + '/' + generatedFileName;
      let filePath = path.join(__dirname, fileName);

      console.log("write file: ", filePath);

      createDir(filePath);
      //this.picturesPath = storePath;

      fs.writeFile(filePath, decodedPicData, 'base64', (err) => {

        if (err) {
          generatedFileName = null;
          console.log("write error: ", err);
          reject(err);
        }
        else {
          resolve({
            id: generatedFileName
          });
        }
      })
    })

  }


  getPicture(fileName) {

    return new Promise((resolve, reject) => {
      fs.readFile(this.picturesPath + '/' + fileName, (err, data) => {
        if (err) {
          reject(err);
        }
        else {
          resolve(data);
        }
      })
    })
  }


  getUrl(fileName)
  {
    return '/upload/' + path.join(fileName);


    //return `${this.picturesPath}/${fileName}`;
  }


  findUser(user) {

    user = {"userId":user.userId, "userPwd":user.userPwd};


    return new Promise((resolve, reject) => {


      let u = undefined;

      if (usersList.find( function(u) { return (user.userId === u.userId && user.userPwd === u.userPwd)}))
      {


        let generatedToken = shortid.generate();
        console.log('user found ', user, generatedToken );
        resolve({userId:user.userId, userToken:generatedToken});
      }

      else {
        console.log("User not found, create user first");
        reject("User not found, create user first");
      }
    })
  }
}





module.exports = ServerStorage;
