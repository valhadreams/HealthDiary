import {Component, Inject} from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA} from "@angular/material";

@Component({
  selector: 'app-two-button-dialog',
  templateUrl: './two-button-dialog.component.html',
  styleUrls: ['./two-button-dialog.component.css']
})
export class TwoButtonDialogComponent{

  dialogTitle: string;
  dialogContent: string;
  leftBtnTitle: string;
  rightBtnTitle: string;

  constructor(public dialogRef: MatDialogRef<TwoButtonDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) {
    this.dialogTitle = data.title;
    this.dialogContent = data.content;
    this.leftBtnTitle = data.leftBtnTitle;
    this.rightBtnTitle = data.rightBtnTitle;
  }

  onLeftBtnClick(){
    this.dialogRef.close(this.leftBtnTitle);
  }

  onRightBtnClick(){
    this.dialogRef.close(this.rightBtnTitle);
  }

  onNoClick(){
    this.dialogRef.close('noclick');
  }
}
