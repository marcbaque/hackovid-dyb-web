import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';
import ProductEntity from 'src/app/core/entity/product.entity';
import TicketEntity from 'src/app/core/entity/ticket.entity';
import { MatDialogRef } from '@angular/material/dialog';
import { Web3Service } from 'src/app/core/web3/web3.service';

@Component({
  selector: 'app-create-ticket',
  templateUrl: './create-ticket.component.html',
  styleUrls: ['./create-ticket.component.scss']
})
export class CreateTicketComponent implements OnInit {

  public step: "FORM" | "LOADING" | "QR" | "CONFIRMED" = "FORM";
  public loadingText;

  public productList: ProductEntity[] = [];
  public ticket: TicketEntity;

  public selectedProduct;
  public selectedCount = 1;

  constructor(
    public web3Service: Web3Service,
    public dialogRef: MatDialogRef<CreateTicketComponent>,
    public sellerService: SellerService
  ) { }

  ngOnInit(): void {
    this.ticket = TicketEntity.new(this.web3Service.getAccount(), this.sellerService.getSellerName());
    this.sellerService.getProducts()
      .subscribe(res => {
        this.productList = res;
      });
  }

  addProduct() {
    let product = this.productList.find((product) => {
      return product.id === parseInt(this.selectedProduct);
    })

    product = product ? product : this.productList[0]

    product.count = this.selectedCount;

    this.ticket.addProduct(product);

    this.selectedProduct = null;
    this.selectedCount = 1;
  }

  onConfirmClick() {
    if (this.step === "FORM") {
      this.step = 'LOADING';
      this.loadingText = 'seller.dashboard.create-ticket.creating';
      this.sellerService.createTicket(this.ticket)
        .subscribe(ticketId => {
          this.ticket.id = ticketId;
          this.step = "QR";
          console.log(this.ticket.toString())
          this.checkTicketTransaction();
        })
    } else {
      this.dialogRef.close();
    }
  }

  public checkTicketTransaction() {
    this.sellerService.checkTicketTransaction(this.ticket)
      .subscribe(txHash => {
        if (txHash) {
          this.ticket.transactionHash = txHash;
          this.step = 'LOADING';
          this.loadingText = 'seller.dashboard.create-ticket.waiting';

          this.web3Service.waitForTransaction(this.ticket.transactionHash)
            .subscribe(() => {
              this.step = 'CONFIRMED';
            }, () => {
              this.step = 'QR';
            })
        } else {
          this.checkTicketTransaction();
        }
      })
  }

}
