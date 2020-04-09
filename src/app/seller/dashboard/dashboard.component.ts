import { Component, OnInit } from '@angular/core';
import { SellerService } from '../seller.service';
import TicketEntity from 'src/app/core/entity/ticket.entity';
import { MatDialog } from '@angular/material/dialog';
import { TicketDetailComponent } from '../ticket-detail/ticket-detail.component';
import { CreateTicketComponent } from '../create-ticket/create-ticket.component';

@Component({
  selector: 'app-seller-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  public ticketList: TicketEntity[] = []
  public balance = 0;

  constructor(
    public sellerService: SellerService,
    public dialog: MatDialog
  ) { }

  ngOnInit(): void {
    this.fetchData();
  }

  public fetchData() {
    this.sellerService.getTickets()
      .subscribe(res => {
        this.ticketList = res;
      })

    this.sellerService.getBalance()
      .subscribe(res => {
        this.balance = res;
      })
  }

  public onListItemClick(ticket) {
    const dialogRef = this.dialog.open(TicketDetailComponent, {
      width: '400px',
      data: ticket
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result)
    });
  }

  public onCreateTicket() {
    const dialogRef = this.dialog.open(CreateTicketComponent, {
      width: '500px',
    });

    dialogRef.afterClosed().subscribe(result => {
      this.fetchData();
    });
  }

}
