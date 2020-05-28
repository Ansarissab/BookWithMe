import { NgModule } from '@angular/core';
import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemsComponent } from './rental-list-items/rental-list-items.component';
import { RentalsComponent } from './rentals.component';
import { CommonModule } from '@angular/common';
import { RentalService } from './shared/rental.service';
import { Routes, RouterModule } from '@angular/router';
import { RentalDetailsComponent } from './rental-details/rental-details.component';


const routes: Routes=[
    { 
        path:'rentals',
        component:RentalsComponent,
        children:[
            {path:'', component:RentalListComponent},
            {path:':rentalId', component:RentalDetailsComponent}
        ]
    }
]

@NgModule({
    declarations:[
        RentalListComponent,
        RentalListItemsComponent,
        RentalsComponent,
        RentalDetailsComponent,
    ],
    imports:[
        CommonModule,
        RouterModule.forChild(routes)
    ],
    providers:[RentalService]
})
export class RentalModule{

}