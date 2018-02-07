import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export class SignUpObj {
  constructor(public id : string,
              public password : string,
              public email : string,
              public gender : string,
              public height : number,
              public weight : number){}
}

@Injectable()
export class SignService {

  constructor(private httpClient : HttpClient) { }

  signUp(signInfo : SignUpObj) : Observable<any>{
    const signUpInfo = {
      'id' : signInfo.id,
      'password' : signInfo.password,
      'email' : signInfo.email,
      'gender' : signInfo.gender,
      'height' : signInfo.height,
      'weight' : signInfo.weight
    };
    return this.httpClient.post('/api/auth/user', signUpInfo);
  }

  signIn(id : string, password : string) : Observable<any>{
    const signInInfo = {
      'id' : id,
      'password' : password
    };
    return this.httpClient.post('/api/auth/login', signInInfo);
  }

  signOut(){
    localStorage.removeItem('token');
    window.location.reload();
  }

  getUserInfo(): Observable<any>{
    return this.httpClient.get('api/auth/user');
  }

  updateUserInfo(userInfo: any): Observable<any>{
    return this.httpClient.put('api/auth/user', userInfo);
  }

  deleteUser(): Observable<any>{
    return this.httpClient.delete('api/auth/user');
  }

}
