import { Component, OnInit } from '@angular/core';

import { PictureStore } from '../picture-store';
import { PictureDisplay } from '../picture-display';

import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
    selector: 'pr-picture-gallery',
    styles: [ require('./picture-gallery.component.css') ],
  template: require('./picture-gallery.component.html')
})



export class PictureGalleryComponent {

    picturList : [PictureDisplay];
    errorMessage: string;
    userId: string;

    static PROVIDERS = [PictureStore];

    // TypeScript public modifiers
   constructor(private pictureStore: PictureStore, private router:Router, private route: ActivatedRoute) {


    }

    ngOnInit() {
      console.log('ngOnInt `PictureGalleryComponent` component');

      this.userId = this.route.params['userId'];

      this.route.params.subscribe(params => {
          this.userId = params['userId'];
          console.log("ngOnInit gallery component param: ", this.userId);

        },
        err => {
          if (err.status == '401') { //unauthorized
            //redirection
            this.router.navigate(['login']);
          }
        });



      this.pictureStore.pictureList(this.userId)
        .then(
          (pictures) => {
            // console.log("pictures: ", pictures);
            this.picturList = pictures.picturesListe;
          },
        ).catch(error => {
        // console.log("ici ", error);
        this.errorMessage = <any>error
        // TODO getsion display de l'error
      });



    }

  ngOnDestroy() {
    console.log('byebye `PictureGalleryComponent` component');
  }

}
