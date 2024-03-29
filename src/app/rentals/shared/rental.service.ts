import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RentalService{
    
    constructor(private http: HttpClient){}
// rental detail
     getRentalById(rentalId:string):Observable<any>{
      return this.http.get('/api/v1/rentals/'+rentalId);
    }
// rental list item
     getRentals():Observable<any> {
      return this.http.get('/api/v1/rentals');
    }
}