import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent {

  public data = {
    name: "",
    cif: "",
    email: ""
  }

  constructor(
    public dialogRef: MatDialogRef<SignupComponent>
  ) {}
}
