/**
 * Created by Administrateur on 10/10/2016.
 */
import {
  async,
  inject,
  TestBed, tick, fakeAsync
} from '@angular/core/testing';
import { Router ,ActivatedRoute} from '@angular/router';

import { LoginComponent }
  from '../../../app/neantine/login/login.component';

import {
  PictureModule
}
  from '../../../app/neantine/neantine.module';

import {
  AuthenticationStore
}
  from '../../../app/user/authentication-store';

 import {
  User
}
  from '../../../app/user/user';



describe('PictureLoginComponent', () => {

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

it('should display 2 input text and a button to submit login and password',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(LoginComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;


      expect(element.querySelector(".login")).toBeTruthy();
      expect(element.querySelector(".password")).toBeTruthy();
      expect(element.getElementsByClassName('.ButtonStyle')).toBeTruthy();

    })
  ));


  it('should connect to user{userLogin:"foo" and userPassword:"bar" and route to the gallery of user connected',  fakeAsync(inject(
    [AuthenticationStore],
    (authenticationStore) => {


      let fixture = TestBed.createComponent(LoginComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;


      let login =element.querySelector(".login");
      let password =element.querySelector(".password");
      let button =element.getElementsByClassName('.ButtonStyle');

      login.value='foo';
      password.value='bar';

      /**
       * DOES NOT WORK
       */
      login.dispatchEvent(new Event('input'));
      password.dispatchEvent(new Event('input'));
      fixture.detectChanges();


      /**
       * SO SMALL ARRANGMENT
       * @type {{username: string; password: string}}
       */
      pictureGalleryComponent.model =
      {
        username: login.value,
        password: password.value
      }

      console.log( pictureGalleryComponent.model);

      spyOn(authenticationStore, 'login')
        .and
        .returnValue(Promise.resolve({userId:'foo', userToken:'xxxxx'}));

      pictureGalleryComponent.login();


        expect((<jasmine.Spy>authenticationStore.login).calls.count()).toEqual(1);

        // TODO find how to dispatch event

        expect((<jasmine.Spy>authenticationStore.login).calls.argsFor(0)).toEqual(
          [new User(
            {username: 'foo',
              password: 'bar'
            })
          ]);


      // TODO verifier le routage et l'enregistrement du token

    })


  ));

  xit('should not connect to user{userLogin:"foo" and userPassword:"tix" and stay on the page',  fakeAsync(inject(
    [], () => {


      let fixture = TestBed.createComponent(LoginComponent);
      let pictureGalleryComponent = fixture.componentInstance;
      let element = fixture.debugElement.nativeElement;


      let login =element.querySelector(".login");
      let password =element.querySelector(".password");
      let button =element.getElementsByClassName('.ButtonStyle');

    })
  ));


});


