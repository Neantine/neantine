import {Injectable} from '@angular/core';
import {Http, Headers, RequestOptions, Response} from '@angular/http';
import {User} from './user';
import {UserDisplay} from './user-display';
import {AuthenticationStore} from './authentication-store';
import {Observable} from 'rxjs';
import 'rxjs/add/operator/map'

@Injectable()
export class UserStore {
  private token: string;

  static PROVIDERS = [
    UserStore
  ];

  // URL to web API

  private usersUrl = '/api/v1/users';

  constructor(private http: Http, private authenticationStore: AuthenticationStore) {
    console.log('hello `UserStore` class');
  }

  getUsers(): Promise<User[]> {

    let headers = new Headers({'Authorization': 'Bearer ' + this.authenticationStore.token});
    let options = new RequestOptions({headers: headers});

    return this.http.get(this.usersUrl, options)
      .toPromise()
      .then(this._checkStatus)
      .then(this._extractData)
      .catch(this._handleError);
  }

  private _checkStatus(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('TODO');
    }
    return response;
  }

  private _extractData(res: Response) {
    let body = res.json();
    let userReceived = {username: body.username, password: body.password};
    return userReceived || {};
  }

  private _extractUsers(res: Response) {

    let body = res.json();
    let _userDisplayArray = [];

    for (let i = 0; i < body.users.length; i++) {
      let usr = new UserDisplay(
        {
          username: body.users[i].username,
          password: body.users[i].password,
          firstName: body.users[i].firstName,
          lastName: body.users[i].lastName
        });
      _userDisplayArray.push(usr);
    }
    let usersToDisplay = {user: body.user, usersListe: _userDisplayArray};
    return usersToDisplay || {};
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

