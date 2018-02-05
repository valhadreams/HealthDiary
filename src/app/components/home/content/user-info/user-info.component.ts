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
  hide = true;
  isShowSpinner = false;

  constructor(private signService : SignService, private router : Router) {
    this.formModel = new FormGroup({
      id : new FormControl({ value: '', disabled: true }),
      password : new FormControl('', Validators.required),
      email : new FormControl('', Validators.email),
      gender : new FormControl(),
      height : new FormControl('', Validators.required),
      weight : new FormControl('', Validators.required)
    });

    this.signService.getUserInfo()
      .subscribe(
        (res) => {
          console.log(res);
          if(res){
            this.formModel.setValue({
              id: res.userId,
              password: '',
              email: res.email,
              gender: res.gender,
              height: res.height,
              weight: res.weight
            });
            this.formModel.patchValue({gender: res.gender});

          }
        },
        (err) => {
          console.log(err);
        },
        () => {

        }
      )
  }

  ngOnInit() {
  }

  submit(){
    this.isShowSpinner = true;

    const userInfo = this.formModel.value;

    this.signService.updateUserInfo(userInfo)
      .subscribe(
        (res) => {
          this.isShowSpinner = false;
          if(res.result === 'ok')
            console.log('update successfully');
        },
        error => {
          console.log('error : ', error);
          this.isShowSpinner = false;
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

  checkValidationGenderBtn() : boolean{
    const { gender } = this.formModel.value;
    return gender !== null && gender !== '';
  }
}
