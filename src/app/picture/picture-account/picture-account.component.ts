import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';



@Component({
  selector: 'login-app',
  styles  : [ require('./picture-account.component.css') ] ,
  template: require('./picture-account.component.html')
})
export class PictureAccountComponent implements OnInit {
  model: any = {};
  loading = false;
  error = '';


  constructor(  private router: Router,) { }

  ngOnInit() {

  }

  createAccount() {

  }

  ngOnDestroy() {
    console.log('byebye picture-account component');
  }
}
