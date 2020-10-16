import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import { Router } from '@angular/router';

@Injectable()
export class AuthService {
  BASE_URL = 'http://localhost:3000';
  NAME_KEY = 'name';
  TOKEN_KEY = 'token';

  constructor(private http: Http, private router: Router) {}

  get name() {
    return localStorage.getItem(this.NAME_KEY);
  }

  get isAuthenticated() {
    return !!localStorage.getItem(this.TOKEN_KEY);
  }

  get tokenHeader() {
    var header = new Headers({
      Authorization: 'Bearer ' + localStorage.getItem(this.TOKEN_KEY),
    });
    return new RequestOptions({ headers: header });
  }

  login(loginData) {
    this.http.post(this.BASE_URL + '/login', loginData).subscribe((res) => {
      this.authenticate(res);
    });
  }

  register(user) {
    delete user.confirmPwd; 
    this.http.post(this.BASE_URL + '/register', user).subscribe((res) => {
      //console.log(JSON.parse(res['_body']).firstName);
      this.authenticate(res);
    });
  }

  logout() {
    localStorage.removeItem(this.NAME_KEY);
    localStorage.removeItem(this.TOKEN_KEY);
  }

  authenticate(res) { 
    var response = JSON.parse(res['_body']);

    if (!response.token) return;
    localStorage.setItem(this.TOKEN_KEY, response.token);
    localStorage.setItem(this.NAME_KEY, response.firstName);
    this.router.navigate(['/']);
  }
}
