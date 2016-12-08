import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';

import { Picture } from '../picture/picture';

import {PictureDisplay} from "../picture/picture-display";

import { Headers, RequestOptions } from '@angular/http';

@Injectable()
export class PictureStore {

  static PROVIDERS = [
    PictureStore
  ];

  // URL to web API

  private uploadUrl = '/api/v1/users/';

  constructor(private http: Http) {

  }

  /**
   *  {userId : this.userId,  picture: picture}
   * @param pictureInfo
   * @return {Promise<TResult|{id: string, title: string, url: string}|{}>}
   */
  uploadPicture(pictureInfo): Promise<Picture> {

    let body = JSON.stringify(pictureInfo.picture);
    let headers = new Headers({'Content-Type': 'application/json'});
    let options = new RequestOptions({headers: headers});


    let uploadUrl = this.uploadUrl + pictureInfo.userId + "/upload";

    console.log('uploadUrl', uploadUrl );

    return this.http.post(uploadUrl, body, options)
      .toPromise()
      .then(this._checkStatus)
      .then(this._extractData)
      .catch(this._handleError);
  }




  pictureList(userId:string): Promise<{user:string, picturesListe:[PictureDisplay]}> {

    let picturesUrl = this.uploadUrl+userId+"/gallery";

    console.log("pictureList ", picturesUrl);


    return this.http.get(picturesUrl)
      .toPromise()
      .then(this._checkStatus)
      .then(this._extractPictures)
      .catch(this._handleError);
  }

  private _checkStatus(response: Response) {
    // console.log("_checkStatus ", response);

    if (response.status < 200 || response.status >= 300) {
      throw new Error('TODO');
    }
    return response;
  }

  private _extractData(res: Response) {
    console.log("_extractData ", res);

    let body = res.json();
    let pictureReceived =  {id: body.id, title: body.title, url: body.url};

    return pictureReceived || {};
  }

  private _extractPictures(res: Response) {
    // console.log("_extractPictures ", res);
    let body = res.json();

    let _pictureDisplayArray = [];

    for(let i=0; i<body.pictures.length;i++){

      let pic = new PictureDisplay(
        {
          id : body.pictures[i].id,
          title : body.pictures[i].title,
          url : body.pictures[i].url
        }
      )

      _pictureDisplayArray.push( pic );
    }

    let picturesToDisplay =  {
      user : body.user,
      picturesListe :_pictureDisplayArray
    };


    return picturesToDisplay || {};

  }

  /**
   *
   * @param file
   *
   */

  handleFileSelect(file) {

    // console.log('_handleFileSelect');

    if (!file) {
      return Promise.reject(null);
    }

    // Only process image files.

    if (!file.type.match('image.*')) {
      return Promise.reject(null);
    }

    let fileReader = new FileReader();

    fileReader.readAsDataURL(file);

    return new Promise((resolve, reject) => {
      fileReader.addEventListener('load', () => {
        resolve(fileReader.result);
      },  false);
    });
  }


  private _handleError(error: any) {
    // In a real world app, we might use a remote logging infrastructure
    // We'd also dig deeper into the error to get a better message
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Promise.reject(errMsg);
  }


}

