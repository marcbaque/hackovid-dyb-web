import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'metric-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public title = '';
  @Input() public value = '';
  @Input() public unit = '';

  constructor() { }

  ngOnInit(): void {
    
  }

}
