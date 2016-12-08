import { Component } from '@angular/core';

import { Picture } from '../picture';
import { PictureStore } from '../picture-store';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'pr-picture-uploader',
  styles  : [ require('./picture-uploader.component.css') ],
  template : require('./picture-uploader.component.html')
})



export class PictureUploaderComponent {

  static PROVIDERS = [PictureStore];
  pictureTmp: Picture = new Picture({});
  errorMessage: string;
  userId: string;

  // TypeScript public modifiers
  constructor(private pictureStore: PictureStore, private router:Router, private route: ActivatedRoute) {

    console.log('constructor PictureUploaderComponent');
  }

  ngOnInit() {
    console.log('ngOnInit `PictureUploaderComponent` component');
    this.route.params.subscribe(params => {
        this.userId = params['userId'];
        console.log("ngOnInit PictureUploaderComponent param: ", this.userId);

      },
      err => {
        if (err.status == '401') { //unauthorized
          //redirection
          this.router.navigate(['login']);
        }
      });
  }

  drag(event) {
    if(event === undefined) {
      return;
    }
    this.pictureStore.handleFileSelect( event.target.files[0] ).then( (file64) => {
      if( !file64 ) {
        return;
      }
      this.pictureTmp.fileData = (file64);
      // TODO display preview picture before upload
    });
  }



  uploadPicture(picture : Picture){
    // if (this._canIuploadThisPicture(picture)){return;}

      this.pictureStore.uploadPicture(
        {userId : this.userId,
          picture: picture}
          )
        .then( picture  => {
             console.log('tout marche bien navette : ' ,picture);
          }
         ).catch(error => {
                this.errorMessage = <any>error
            // TODO getsion display de l'error
      });

  }

  ngOnDestroy() {
    console.log('byebye uploader component');
  }



  /*
    private _resetPictureTmp(){
    this._resetPictureTitle();
    this.pictureTmp.fileData=null;
    // TODO trigger fake event for the input file
    let inputElement = document.querySelector('input[name="file"]');

    inputElement.dispatchEvent(new Event('change'));
  }

  private  _resetPictureTitle(){
    this.pictureTmp.title="";
  }*/



  /*  private _canIuploadThisPicture(picture ){
    console.log(picture.fileToUpload);
    if(picture.fileToUpload==null){
      //no picture files to upload
      console.log("there is no file picture to upload")
      return false;
    }
    console.log(picture.fileToUpload.type);
    //TODO add all verification for type, size, name etc
    if (! picture.fileToUpload.type.match('image/jpeg')) {
      console.log("this is not a jpeg picture")
      return false;
    }
  return true;
  }
  */


  }
