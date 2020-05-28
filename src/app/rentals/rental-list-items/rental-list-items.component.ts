import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'bwm-rental-list-items',
  templateUrl: './rental-list-items.component.html',
  styleUrls: ['./rental-list-items.component.scss']
})
export class RentalListItemsComponent implements OnInit {

  @Input() rental:any;
  constructor() { }

  ngOnInit(): void {
  }

}
