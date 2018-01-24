import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {SignService, SignUpObj} from "../../../services/sign.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign.up.component.html',
  styleUrls: ['./sign.up.component.css']
})
export class SignUpComponent implements OnInit {
  formModel: FormGroup;
  hide = true;
  isValidationGenderBtn = true;

  constructor(private signService : SignService, private router : Router) {
    this.formModel = new FormGroup({
      id : new FormControl('', Validators.required),
      password : new FormControl('', Validators.required),
      email : new FormControl('', Validators.email),
      // sex : new FormControl('', sexFormValidator),
      gender : new FormControl(),
      tall : new FormControl('', Validators.required),
      weight : new FormControl('', Validators.required)
    });
  }

  submit(){
    this.isValidationGenderBtn = this.checkValidationGenderBtn();
    const { id, password, email, gender, tall, weight } = this.formModel.value;
    // const sex = (this.formModel.value.sex === '1' ) ? 'male' : 'female';
    const signInfo = new SignUpObj(id, password, email, gender, tall, weight);
    this.signService.signUp(signInfo)
      .subscribe(
        (value) => {
          console.log('post successfully : ', value);
          if(value) this.router.navigate(['/sign-in']);
        },
        error => {
          console.log('post error : ', error);
        },
        () => {
          console.log('post complete');
        }
      );
    // console.log(this.formModel.value, sex);
  }

  checkValidationGenderBtn() : boolean{
    const { gender } = this.formModel.value;
    if(gender !== null && gender !== '')
      return true;

    return false;
  }

  ngOnInit() {
  }

}
