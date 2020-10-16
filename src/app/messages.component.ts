import { Component } from '@angular/core';
import { WebService } from './web.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'messages',
  template: `
    <div *ngFor="let msg of WebService.msgs | async">
      <mat-card class="cards">
        <mat-card-title [routerLink]="['/messages', msg.owner]">
          {{ msg.owner }}
        </mat-card-title>
        <mat-card-content>{{ msg.test }}</mat-card-content>
      </mat-card>
      <button mat-button>Basic</button>
    </div>
  `,
})
export class MsgsComponent {
  constructor(
    public WebService: WebService,
    private ActivateRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    var name = this.ActivateRoute.snapshot.params.name;
    this.WebService.getMessages(name);
    this.WebService.getUser().subscribe();
  }
}
