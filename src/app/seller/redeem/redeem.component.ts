import { Component, OnInit } from '@angular/core';
import { Web3Service } from 'src/app/core/web3/web3.service';

@Component({
  selector: 'app-redeem',
  templateUrl: './redeem.component.html',
  styleUrls: ['./redeem.component.scss']
})
export class RedeemComponent implements OnInit {

  public state: "INFO" | "WAITING" | "SUCCESS" | "ERROR" = "INFO";

  constructor(
    public web3Service: Web3Service
  ) { }

  ngOnInit(): void {
  }

  redeem() {
    this.state = 'WAITING';

    this.web3Service.redeem()
      .subscribe(res => {
        if (res) {
          this.state = 'SUCCESS'
        } else {
          this.state = 'ERROR'
        }
      }, () => {
        this.state = 'ERROR'
      })
  }

}
