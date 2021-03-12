import { Component, ViewChild } from '@angular/core';

import { NavComponent } from './nav.component';

@Component({
  selector: 'app-root',
  //templateUrl: './app.component.html',
  template: `
    <nav></nav>
    <router-outlet></router-outlet>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent {}
