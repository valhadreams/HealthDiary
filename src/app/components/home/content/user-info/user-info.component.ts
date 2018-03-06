import { Component, OnInit } from '@angular/core';
import {SignService} from "../../../../services/sign.service";
import {Observable} from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/share';
import 'rxjs/add/observable/empty';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  // userData: Observable<any>;
  userData = null;

  constructor(private signService : SignService) {
  }

  ngOnInit() {
    this.signService.getUserInfo()
      // .map((res) => {
      //   if (res) {
      //     const data = {
      //       nickname : res.nickname,
      //       email : res.email,
      //       gender : res.gender,
      //       height : res.height,
      //       weight : res.weight
      //     };
      //     return data;
      //   } else {
      //     throw new Error('Error');
      //   }
      // })
      // .catch(err => {
      //   console.log(err);
      //   return Observable.empty();
      // })
      // .share();
      .subscribe(
        (res) => {
          console.log(res);
          if (res) {
            this.userData = {
              nickname: res.nickname,
              email: res.email,
              gender: res.gender,
              height: res.height,
              weight: res.weight
            };
          }
        },
        (err) => {
          console.log(err);
          this.userData = {
            nickname : 'error',
            email : 'error@gmail.com',
            gender : 'G',
            height : 111,
            weight : 111
          };
        },
        () => {

        }
      )
  }

  submit(formValue : any){
    const userInfo = formValue;

    this.signService.updateUserInfo(userInfo)
      .subscribe(
        (res) => {
          if(res.result === 'ok')
            console.log('update successfully');
        },
        error => {
          console.log('error : ', error);
        },
        () => {
          console.log('post complete');
        }
      );
  }

  deleteUser(){
    this.signService.deleteUser()
      .subscribe(
        (res) => {
          if(res.result === 'ok'){
            this.signService.signOut();
          }
        },
        (err) => {
          console.log(err);
        },
        () => {

        }
      )
  }
}
