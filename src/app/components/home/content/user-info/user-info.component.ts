import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {Router} from "@angular/router";
import {SignService, SignUpObj} from "../../../../services/sign.service";

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  formModel: FormGroup;
  nickname: string;
  email: string;
  gender: string;
  height: number;
  weight: number;

  constructor(private signService : SignService) {
    this.formModel = new FormGroup({
      email : new FormControl('', Validators.email),
      nickname : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      gender : new FormControl(),
      height : new FormControl('', Validators.required),
      weight : new FormControl('', Validators.required)
    });

    this.signService.getUserInfo()
      .subscribe(
        (res) => {
          console.log(res);
          if(res){
            this.nickname = res.nickname;
            this.email = res.email;
            this.gender = res.gender;
            this.height = res.height;
            this.weight = res.weight;
          }
        },
        (err) => {
          console.log(err);
          this.nickname = 'nickname';
          this.email = 'email';
          this.gender = 'Female';
          this.height = 222;
          this.weight = 222;
        },
        () => {

        }
      )
  }

  ngOnInit() {
  }

  submit(formValue : any){
    const userInfo = this.formModel.value;

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
