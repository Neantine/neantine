const express = require('express');
const supertest = require('supertest');

const app = require('../../app');
const config = require('../../config/config');
var path = require('path');

const fs = require('fs');
const ServerStorage = require('../../app/lib/filesystem-server-storage');

describe('ServerStorage', () => {

  describe('function savePicture (called when post api/v1/user/1/pictures/ is received)', function() {

      xit('should save the file in the filesystem', function (done) {

        //TMP: test with a base64 canvas encoded file get from body request
        let bodyReqPictureData = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABQAAAAUCAYAAACNiR0"
          + "NAAAAKElEQVQ4jWNgYGD4Twzu6FhFFGYYNXDUwGFpIAk2E4dHDRw1cDgaCAASFOffhEIO"
          + "3gAAAABJRU5ErkJggg==";
        let bodyReqTitle = 'test-image';

        let serverStorage = new ServerStorage();

        serverStorage.savePicture(bodyReqTitle, bodyReqPictureData).then( (generatedFileName)=> {
          console.log("Picture saved with generatedFileName: ", generatedFileName);
          expect(generatedFileName).toBeNonEmptyString;
          return done();

        }).catch( (err) => {
          console.log(err);
          return done(err);
        })
      });
  })



  describe('function getPicture (called when get api/v1/user/1/pictures/1 is received)', function() {

    xit('should get the file from the filesystem', function (done) {

      let serverStorage = new ServerStorage();
      serverStorage.getPicture('test-imageB1UnVakA').then( (data) => {

        expect(data).toBeNonEmptyObject;
        return(done);

      }).catch( (err) => {
        console.log(err);
        return done(err);
      }) ;



      return done();
    });

   })


});
