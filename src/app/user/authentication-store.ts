import { Injectable } from '@angular/core';
import { Http, Headers, Response , RequestOptions} from '@angular/http';


import { User } from './user';

@Injectable()
export class AuthenticationStore {
  public token : string;

  static PROVIDERS = [
    AuthenticationStore
  ];
  private usersUrl = '/api/v1/users';

  constructor(private http: Http) {
    // set token if saved in local storage

    var currentUserId = JSON.parse(localStorage.getItem('currentUserId'));
    var currentUserToken = JSON.parse(localStorage.getItem('currentUserToken'));
    this.token = currentUserId && currentUserToken;
  }

  login(user : User): Promise<any> {
   let headers = new Headers({'Content-Type': 'application/json'});

    let options = new RequestOptions({headers: headers});
    headers.append("userLogin" , user.username);
    headers.append("userPassword", user.password );

    return this.http.get(this.usersUrl, options)
      .toPromise()
      .then(this._checkStatus)
      .then(this._extractToken)
      .catch(this._handleError);

  };


  logout(): void {
    // clear token remove user from local storage to log user out
    this.token = null;
    localStorage.removeItem('currentUser');
  }

  private _checkStatus(response: Response) {
    if (response.status < 200 || response.status >= 300) {
      throw new Error('TODO');
    }
    return response;
  }

  private _extractToken(res: Response){
    let body = res.json();
    let token =  body.userToken;
    console.log("token : ", token)
    if (token) {
      localStorage.setItem('currentUserId', JSON.stringify({ username: body.userId}));
      localStorage.setItem('currentUserToken', JSON.stringify({usertoken: token }));
      return ({username: body.userId, usertoken: token});
    } else {
      // return false to indicate failed login
      console.log("return false to indicate failed login");
      throw new Error('TODO');
    }
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
