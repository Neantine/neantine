/**
 * Created by Administrateur on 10/10/2016.
 */
/**
 * Created by Administrateur on 10/10/2016.
 */
import {
  async,
  inject,
  TestBed, tick, fakeAsync
} from '@angular/core/testing';
import { Router, ActivatedRoute } from '@angular/router';


import { PictureModule }
  from '../../../app/neantine/neantine.module';

import { PictureAccountComponent }
  from '../../../app/neantine/account/account.component';




describe('PictureAccountComponent', () => {

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
      ]
    }).compileComponents();

  }));

  xit('should display 5 input text(login, password, name, lastname,mail) and a button to submitton to submit',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(PictureAccountComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;


    })
  ));


  xit('should create an account normaly for this user',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(PictureAccountComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;

    })
  ));

  xit('should not create an account because password is not enough strong',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(PictureAccountComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;



    })
  ));

  xit('should not create an account because login is already use by another user (status 409)',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(PictureAccountComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;



    })
  ));

  xit('should not create an account because this mail is already registered (status 409)',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(PictureAccountComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;

    })
  ));


});


