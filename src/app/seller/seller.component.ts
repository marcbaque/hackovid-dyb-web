import { Component, OnInit } from '@angular/core';
import { SellerService } from './seller.service';
import { SignupComponent } from './signup/signup.component';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-seller',
  templateUrl: './seller.component.html',
  styleUrls: ['./seller.component.scss']
})
export class SellerComponent implements OnInit {

  public state: "LOADING" | "NOT_AUTHORIZED" | "DASHBOARD" = "LOADING";

  constructor(
    public sellerService: SellerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.sellerService.checkAuthorized()
      .subscribe(res => {
        this.state = 'DASHBOARD';
      }, () => {
        this.state = 'NOT_AUTHORIZED';
      })
  }

  openSignupDialog(): void {
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '400px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sellerService.signupSeller()
        .subscribe(res => {
          console.log(res)
          this.state = 'DASHBOARD';
        }, err => {
          console.error(err)
          this.state = 'NOT_AUTHORIZED';
        })
    });
  }

}
