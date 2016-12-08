
import { Picture } from '../../app/picture/picture';
import { PictureStore } from '../../app/picture/picture-store';
import { PictureModule } from '../../app/picture/picture.module';
import { TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, RequestMethod, ResponseOptions, Response } from '@angular/http';
import { MockBackend } from '@angular/http/testing';

describe('PictureStore', () => {

  beforeEach(() => {

    this.FileReaderBackup = window['FileReader'];
  });

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        PictureModule
      ],
      providers: [
        BaseRequestOptions,
        MockBackend,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    }).compileComponents();
  }));

  afterEach(() => {
    window['FileReader'] = this.FileReaderBackup;
  });

  it('should upload a picture{title:test, fileData:{data encoded in base 64}',
    fakeAsync(inject([MockBackend, PictureStore],
      (backend, pictureStore) => {
   let picture =  new Picture({
     title: 'toto',
     fileData: 'data:image/jpg;base64,IMAGE_DATA'
   });

    let connectionCountSpy;



    connectionCountSpy = jasmine.createSpy('connectionCount');
    /* Mock backend. */
    backend.connections.subscribe(connection => {
      connectionCountSpy();
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/api/v1/users/1/upload');
      expect(connection.request.json()).toEqual({
        title: 'toto',
        fileData: 'data:image/jpg;base64,IMAGE_DATA'
      });

      connection.mockRespond(new Response(new ResponseOptions({
        status: 201,
      body: {
        id: 'IMAGE_ID',
        title: 'toto',
        url: '/uploads/IMAGE_ID.jpg'
      }})));
    });

    pictureStore.uploadPicture(
      { userId:'1' ,
        picture:picture}
        );

    expect(connectionCountSpy.calls.count()).toEqual(1);
  })));


  it('should manage a handle error',
    fakeAsync(inject([MockBackend, PictureStore],
      (backend, pictureStore) => {
    let error;
    let picture =  new Picture({
      title: 'toto',
      fileData: 'data:image/jpg;base64,IMAGE_DATA'
    });
    let connectionCountSpy;

    connectionCountSpy = jasmine.createSpy('connectionCount');

    /* Mock backend. */
    backend.connections.subscribe(connection => {
      connectionCountSpy();
      expect(connection.request.method).toEqual(RequestMethod.Post);
      expect(connection.request.url).toEqual('/api/v1/users/1/upload');
      expect(connection.request.json()).toEqual({
        title: 'toto',
        fileData: 'data:image/jpg;base64,IMAGE_DATA'
      });
      connection.mockRespond(new Response(new ResponseOptions({
        status: 500
      })));
    });

    pictureStore.uploadPicture({ userId:'1' ,
      picture:picture}
      ).catch(_error => error = _error);

    tick();

    expect(connectionCountSpy.calls.count()).toEqual(1);

    // TODO change to pass the code
    expect(error).toBeTruthy();

  })));

  xit('should return Promise.reject(null) if method handleFileSelect(null)',
    inject([], () => {
  }));

  xit('should return Promise.reject(null) if method handleFileSelect(file) with file.type.match("image.*") ',
    inject([], () => {
  }));

  it('should receive a pictureList of 3 pictures',
    fakeAsync(inject([MockBackend, PictureStore], (backend, pictureStore) => {


    let connectionCountSpy;

    connectionCountSpy = jasmine.createSpy('connectionCount');
    /* Mock backend. */
    backend.connections.subscribe(connection => {
      connectionCountSpy();
      expect(connection.request.method).toEqual(RequestMethod.Get);
      expect(connection.request.url).toEqual('/api/v1/users/1/gallery');
      connection.mockRespond(new Response(new ResponseOptions({
        status: 200,
        body: {
          user: 1,
          pictures:
            [
              {id : 1, title : 'image 1', url : 'test1.jpg'},
              {id : 2, title : 'image 2', url : 'test2.jpg'},
              {id : 3, title : 'image 3', url : 'test3.jpg'}
            ]
        }
      })));
    });

    pictureStore.pictureList('1');

    expect(connectionCountSpy.calls.count()).toEqual(1);
    })));

  it('should handle an empty list of pictures when pictureList()',
    fakeAsync(inject([MockBackend, PictureStore], (backend, pictureStore) => {
      let error;
      let connectionCountSpy;

      connectionCountSpy = jasmine.createSpy('connectionCount');
      /* Mock backend. */
      backend.connections.subscribe(connection => {
        connectionCountSpy();
        expect(connection.request.method).toEqual(RequestMethod.Get);
        expect(connection.request.url).toEqual('/api/v1/users/1/gallery');
        connection.mockRespond(new Response(new ResponseOptions({
          status: 500,
          body: {
            user: 1,
            pictures: [{}]
          }
        })));
      });

      pictureStore.pictureList('1').catch(_error => error = _error);

      tick();

      expect(connectionCountSpy.calls.count()).toEqual(1);

      // TODO change to pass the code
      expect(error).toBeTruthy();
    })));


  });
