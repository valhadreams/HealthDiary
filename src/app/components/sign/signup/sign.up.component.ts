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
  isDuplicateId = false;
  isShowSpinner = false;

  constructor(private signService : SignService, private router : Router) {
    this.formModel = new FormGroup({
      id : new FormControl(),
      password : new FormControl('', Validators.required),
      email : new FormControl('', Validators.email),
      // sex : new FormControl('', sexFormValidator),
      gender : new FormControl(),
      height : new FormControl('', Validators.required),
      weight : new FormControl('', Validators.required)
    });
  }

  submit(){
    this.isValidationGenderBtn = this.checkValidationGenderBtn();
    if(!this.formModel.valid || !this.isValidationGenderBtn)
      return;

    this.isShowSpinner = true;

    const { id, password, email, gender, height, weight } = this.formModel.value;
    // const sex = (this.formModel.value.sex === '1' ) ? 'male' : 'female';
    const signInfo = new SignUpObj(id, password, email, gender, height, weight);
    this.signService.signUp(signInfo)
      .subscribe(
        (res) => {
          if(res.result)
            this.router.navigate(['/sign-in']);
        },
        error => {
          if(error.status === 409) // duplicate id
            this.isDuplicateId = true;
          console.log('post error : ', error);
          this.isShowSpinner = false;
        },
        () => {
          console.log('post complete');
        }
      );
  }

  checkValidationGenderBtn() : boolean{
    const { gender } = this.formModel.value;
    return gender !== null && gender !== '';
  }

  ngOnInit() {
  }

}
