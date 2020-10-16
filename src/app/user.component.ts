import { Component } from '@angular/core';
import { WebService } from './web.service';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';

@Component({
  selector: 'user',
  templateUrl: `./user.component.html`,
})
export class UserComponent {
  constructor(private WebService: WebService) {}
  model = {
    firstName: '',
    lastName: '',  
  };

  ngOnInit() {
    this.WebService.getUser().subscribe((res) => {
      this.model.firstName = res.firstName;
      this.model.lastName = res.lastName;

      console.log(this.model);
    });
  }
  post() {
    console.log(this.model);
    this.WebService.saveUser(this.model);
  }
}
