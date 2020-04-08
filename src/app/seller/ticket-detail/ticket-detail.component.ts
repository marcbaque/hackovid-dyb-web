import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import TicketEntity from 'src/app/core/entity/ticket.entity';

@Component({
  selector: 'app-ticket-detail',
  templateUrl: './ticket-detail.component.html',
  styleUrls: ['./ticket-detail.component.scss']
})
export class TicketDetailComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TicketDetailComponent>,
    @Inject(MAT_DIALOG_DATA) public data: TicketEntity
  ) {}

  ngOnInit(): void {
    console.log(this.data)
  }

}
