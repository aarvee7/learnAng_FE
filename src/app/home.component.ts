import { Component, ViewChild } from '@angular/core';
import { MsgsComponent } from './messages.component';
import { NewMsgComponent } from './new-message.component';
import { NavComponent } from './nav.component';
import { TableComponent } from './table.component';

@Component({
  selector: 'home',
  //templateUrl: './app.component.html',
  template: `
    <new-message> </new-message>
    <messages> </messages>
  `,
  styleUrls: ['./app.component.css'],
})
export class HomeComponent {}
