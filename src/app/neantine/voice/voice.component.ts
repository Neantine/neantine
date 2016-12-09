import { Component, OnInit } from '@angular/core';



@Component({
  selector: 'home-app',
  styles  : [ require('./voice.component.css') ],
  template: require('./voice.component.html')
})

export class VoiceComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    // // get users from secure api end point
    // this.userStore.getUsers()
    //   .then(users => {
    //     this.users = users;
    //   });
  }


  ngOnDestroy() {
    console.log('byebye `VoiceComponent` component');
  }

}
