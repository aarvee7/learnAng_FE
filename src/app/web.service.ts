import { Http } from '@angular/http';

//import 'rxjs/add/operator/toPromise';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import 'rxjs/add/operator/map';
import { AuthService } from './auth.service';
//import { map} from 'rxjs/operator'
//import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable()
export class WebService {
  //BASE_URL = 'http://localhost:3000';
  BASE_URL = 'https://node-test-rv235.herokuapp.com';
  private msgStore = [];

  private msgSubject = new Subject();

  msgs = this.msgSubject.asObservable();

  constructor(private http: Http, private auth: AuthService) {
    this.getMessages('');
  }

  getMessages(user) {
    user = user ? '/' + user : '';
    this.http.get(this.BASE_URL + '/messages' + user).subscribe(
      (response) => {
        this.msgStore = response.json();
        this.msgSubject.next(this.msgStore);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getallMessages() {
    return this.http.get(this.BASE_URL + '/messages');
    // .subscribe(
    //   (response) => {
    //     this.msgStore = response.json();
    //     this.msgSubject.next(this.msgStore);
    //   },
    //   (error) => {
    //     console.log(error);
    //   }
    // );
  }

  async postMessages(msg) {
    var response = await this.http
      .post(this.BASE_URL + '/message', msg)
      .toPromise();
    this.msgStore.push(response.json());
    this.msgSubject.next(this.msgStore);
  }

  getUser() {
    return this.http
      .get(this.BASE_URL + 'users/me', this.auth.tokenHeader)
      .map((res) => res.json());
  }

  saveUser(userData) {
    return this.http
      .post(this.BASE_URL + 'users/me', userData, this.auth.tokenHeader)
      .map((res) => res.json());
  }
}
