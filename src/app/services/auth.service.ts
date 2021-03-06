import { Injectable } from '@angular/core';
import {tokenNotExpired} from 'angular2-jwt';


@Injectable()
export class AuthService {

  constructor() { }

  public getToken(): string {
    return localStorage.getItem('token');
  }
  public isAuthenticated(): boolean {
    // get the token
    let token = this.getToken();

    if(token === "null")
      token = null;

    return tokenNotExpired(null, token);
  }
}
