import { Component } from '@angular/core';
import { AuthService } from './auth.service';

@Component({
  selector: 'nav',
  template: `
    <mat-toolbar
      color="primary"
      style="top:0px;
    z-index: 10;
    position : fixed;"
    >
      <button mat-button routerLink="/">Message Board</button>
      <button mat-button routerLink="/messages">Msgs</button>
      <button mat-button routerLink="/tableview">Table View</button>

      <span style="flex : 1 1 auto"> </span>

      <button
        *ngIf="!authService.isAuthenticated"
        mat-button
        routerLink="/login"
      >
        Login
      </button>

      <button
        *ngIf="!authService.isAuthenticated"
        mat-button
        routerLink="/register"
      >
        Register
      </button>

      <button *ngIf="authService.isAuthenticated" mat-button routerLink="/user">
        Welcome {{ authService.name }}
      </button>

      <button
        *ngIf="authService.isAuthenticated"
        mat-button
        (click)="authService.logout()"
      >
        LogOut
      </button>
    </mat-toolbar>
  `,
})
export class NavComponent {
  constructor(private authService: AuthService) {}
}
