import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { NgPipesModule } from 'ngx-pipes';

import { RentalListComponent } from './rental-list/rental-list.component';
import { RentalListItemsComponent } from './rental-list-items/rental-list-items.component';
import { RentalsComponent } from './rentals.component';
import { RentalDetailsComponent } from './rental-details/rental-details.component';

import { RentalService } from './shared/rental.service';



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
        RouterModule.forChild(routes),
        HttpClientModule,
        NgPipesModule
    ],
    providers:[RentalService]
})
export class RentalModule{

}