import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign.up.component.html',
  styleUrls: ['./sign.up.component.css']
})
export class SignUpComponent implements OnInit {
  formModel : FormGroup;
  hide : boolean = true;

  constructor() {
    this.formModel = new FormGroup({
      id : new FormControl(),
      password : new FormControl(),
      birthday : new FormControl({value : '', disabled : true}),
      sex : new FormControl(),
      tall : new FormControl(),
      weight : new FormControl()
    });
  }

  submit(){
    const { id, password, birthday, sex, tall, weight } = this.formModel.value;
    console.log(this.formModel.value, sex);
  }

  ngOnInit() {
  }

}
