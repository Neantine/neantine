import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'home-app',
  styles  : [ require('./development.component.css') ],
  template: require('./development.component.html')
})

export class DevelopmentComponent implements OnInit {


  ngOnInit() {
    // // get users from secure api end point
    // this.userStore.getUsers()
    //   .then(users => {
    //     this.users = users;
    //   });
  }


  ngOnDestroy() {
    console.log('byebye `DevelopmentComponent` component');
  }

}
