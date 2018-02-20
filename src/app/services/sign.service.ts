import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs/Observable";

export class SignUpObj {
  constructor(public email : string,
              public password : string,
              public nickname : string,
              public gender : string,
              public height : number,
              public weight : number){}
}

@Injectable()
export class SignService {

  constructor(private httpClient : HttpClient) { }

  signUp(signInfo: SignUpObj): Observable<any>{
    const signUpInfo = {
      'nickname' : signInfo.nickname,
      'password' : signInfo.password,
      'email' : signInfo.email,
      'gender' : signInfo.gender,
      'height' : signInfo.height,
      'weight' : signInfo.weight
    };
    // const signUpInfo = new HttpParams()
    //   .set('email', signInfo.email)
    //   .set('password', signInfo.password)
    //   .set('nickname', signInfo.nickname)
    //   .set('gender', signInfo.gender)
    //   .set('height', signInfo.height.toString())
    //   .set('weight', signInfo.weight.toString());
    return this.httpClient.post('/api/auth/user', signUpInfo);
  }

  signIn(email: string, password: string): Observable<any>{
    const signInInfo = {
      'email' : email,
      'password' : password
    };
    // const signInInfo = new HttpParams()
    //   .set('email', email)
    //   .set('password', password);
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
