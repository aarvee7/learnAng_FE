import { Component } from '@angular/core';
import { WebService } from './web.service';
//import { Message } from '@angular/compiler/src/i18n/i18n_ast';

import { AuthService } from './auth.service';

@Component({
  selector: 'new-message',
  templateUrl: `./new-message.component.html`,
})
export class NewMsgComponent {
  constructor(private WebService: WebService, private auth: AuthService) {}
  msg = {
    owner: this.auth.name,
    test: '',
  };
  post() {
    console.log(this.msg);
    this.WebService.postMessages(this.msg);
  }
}
