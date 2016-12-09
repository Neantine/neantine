import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationStore } from '../../user/authentication-store';
import { User } from '../../user/user';



@Component({
  selector: 'login-app',
  styles  : [ require('./login.component.css') ] ,
  template: require('./login.component.html')
})


export class LoginComponent implements OnInit {
  model: User = new User({});
  loading = false;
  error = '';


  constructor(
    private router: Router,
    private authenticationStore: AuthenticationStore) { }

  ngOnInit() {
    // reset login status
    this.authenticationStore.logout();
  }

  login() {
    this.loading = true;
    this.authenticationStore.login(new User(
      {username: this.model.username,
      password : this.model.password}))
      .then(result => {
          // login successful
          console.log("Login ", result.username)
          this.router.navigate(['/gallery', result.username]);
      }).catch(
        err =>{
      // login failed
      this.error = err;
      this.loading = false;
    });
  }

  ngOnDestroy() {
    console.log('byebye login component');
  }
}
