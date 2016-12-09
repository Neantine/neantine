import { Component, OnInit } from '@angular/core';

import { User } from '../../user/user';
import { UserStore } from '../../user/user-store';

@Component({
  selector: 'home-app',
  styles  : [ require('./home.component.css') ],
  template: require('./home.component.html')
})

export class HomeComponent implements OnInit {
  users: User[] = [];

  constructor(private userStore: UserStore) { }

  ngOnInit() {
    // // get users from secure api end point
    // this.userStore.getUsers()
    //   .then(users => {
    //     this.users = users;
    //   });
  }


  ngOnDestroy() {
    console.log('byebye `HomeComponent` component');
  }

}
