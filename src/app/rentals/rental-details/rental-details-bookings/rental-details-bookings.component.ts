import { Component, OnInit, Input } from '@angular/core';


@Component({
  selector: 'bwm-rental-details-bookings',
  templateUrl: './rental-details-bookings.component.html',
  styleUrls: ['./rental-details-bookings.component.scss']
})
export class RentalDetailsBookingsComponent implements OnInit {

  
  @Input() price: number;
  public daterange: any = {};

  constructor() { }

  ngOnInit(): void {
  }
  options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: false,
    opens: 'left'
  };

   selectedDate(value: any, datepicker?: any) {
    //console.log(value);
    datepicker.start = value.start;
    datepicker.end = value.end;
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;
  }
}
