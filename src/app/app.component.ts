/*
 * Angular 2 decorators and services
 */
import { Component, ViewEncapsulation } from '@angular/core';

/*
 * App Component
 * Top Level Component
 */
@Component({
  selector: 'app',
  encapsulation: ViewEncapsulation.None,
  template: `
    <main>
      <router-outlet></router-outlet>
    
    </main>
  `,
  styles: [
    require('./app.component.scss')
  ]
})
export class App {
}

