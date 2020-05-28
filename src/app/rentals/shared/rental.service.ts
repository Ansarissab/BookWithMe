import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Rental } from './rental.model';

@Injectable()
export class RentalService{
    private rentals:Rental[]=[
    {
      id:"1",
      title:"Furnished Appartment",
      city:"New York",
      street:"Times Square",
      category:"Appartment",
      image:"/assets/images/350x250.png",
      bedrooms:3,
      description:"Very Nice Appartment",
      dailyRate:50,
      createdOn:"24/05/2020",
      shared:false
    },
    {
      id:"2",
      title:"Lush Appartment",
      city:"Washington",
      street:"Times Square",
      category:"Appartment",
      image:"/assets/images/350x250.png",
      bedrooms:3,
      description:"Very Nice Appartment",
      dailyRate:50,
      createdOn:"24/05/2020",
      shared:false
    },
    {
      id:"3",
      title:"Push Appartment",
      city:"Virginia",
      street:"Times Square",
      category:"Appartment",
      image:"/assets/images/350x250.png",
      bedrooms:3,
      description:"Very Nice Appartment",
      dailyRate:50,
      createdOn:"24/05/2020",
      shared:false
    }

    ];
// rental detail
     getRentalById(rentalId:string):Observable<Rental>{
      return new Observable<Rental>((observer)=>{
        setTimeout(()=>{
            const foundRental = this.rentals.find((rental)=>{
              return (rental.id == rentalId);
            });
            observer.next(foundRental);
        },500);
      });
    }
// rental list item
     getRentals():Observable<Rental[]> {
        return new Observable<Rental[]>((observer)=>{
          setTimeout(()=>{
              observer.next(this.rentals);
          }, 1000);
        });
    }
}