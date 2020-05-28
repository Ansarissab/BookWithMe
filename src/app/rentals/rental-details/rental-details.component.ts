import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RentalService } from '../shared/rental.service';
import { Rental } from '../shared/rental.model';

@Component({
  selector: 'bwm-rental-details',
  templateUrl: './rental-details.component.html',
  styleUrls: ['./rental-details.component.css']
})
export class RentalDetailsComponent implements OnInit {

  rental:Rental;
  currentId:string;
  constructor(private route:ActivatedRoute, private rentalService:RentalService) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params)=>{
        this.currentId = params.rentalId;
        this.getRental(this.currentId);
       //console.log(params.rentalId);
      }
    );
  }

  getRental(rentalId:string){
    this.rentalService.getRentalById(rentalId).subscribe(
      (_rental:Rental)=>{
        this.rental = _rental;
      }
    );
  }

}
