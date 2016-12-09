import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'home-app',
  styles  : [ require('./minichoeurs.component.css') ],
  template: require('./minichoeurs.component.html')
})

export class MiniChoeursComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // // get users from secure api end point
    // this.userStore.getUsers()
    //   .then(users => {
    //     this.users = users;
    //   });
  }


  ngOnDestroy() {
    console.log('byebye `MiniChoeursComponent` component');
  }

}
