import {
    async,
    inject,
    TestBed, tick, fakeAsync
} from '@angular/core/testing';
import { Router ,ActivatedRoute} from '@angular/router';
import { Observable } from 'rxjs';

import { PictureGalleryComponent }
  from '../../../app/picture/picture-gallery/picture-gallery.component';
import { PictureModule }
    from '../../../app/picture/picture.module';
import { PictureStore }
  from '../../../app/picture/picture-store';
import { PictureDisplay }
  from '../../../app/picture/picture-display';


describe('PictureGalleryComponent', () => {

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                PictureModule
            ],
          providers: [
            {
              provide: Router,
              useValue: {
                navigate: jasmine.createSpy('navigate')
              }
            }
            ,
            {
              provide: ActivatedRoute,
              useValue: {}
            }
          ]
        }).compileComponents();

    }));


    it('should display 3 images after a call at method pictureList(userId)',  fakeAsync(inject(
        [ PictureStore , Router, ActivatedRoute ], (pictureStore,router,activatedRoute) => {
          let pictures = [
            new PictureDisplay ({id:'1', title: 'image 1', url: 'picture/img/test1.jpg'}),
            new PictureDisplay ( {id:'2', title: 'image 2', url: 'picture/img/test2.jpg'}),
            new PictureDisplay ({id:'3', title: 'image 3', url: 'picture/img/test3.jpg'})
          ];

        activatedRoute.params = Observable.from([{
          userId: '1'
        }]);

          /* Mock PictureStore. */
          spyOn(pictureStore, 'pictureList').and.returnValue(Promise.resolve(
            {
              user:'1',
              picturesListe :pictures
            }
          ));

        let fixture = TestBed.createComponent(PictureGalleryComponent);
        fixture.componentInstance.ngOnInit();

        tick(); //wait that all promise finish

        let pictureGalleryComponent = fixture.componentInstance;
        let element = fixture.debugElement.nativeElement;

          fixture.detectChanges();

         let images = element.querySelectorAll('.gallery__item__image');

         expect(pictureGalleryComponent.picturList.length).toEqual(pictures.length);
         expect(images.length).toEqual(pictures.length);
          // TODO test url and title of picture
        })
    ));
});
