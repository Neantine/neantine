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
