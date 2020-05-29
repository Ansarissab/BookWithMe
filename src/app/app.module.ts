import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './common/header/header.component';
import { RentalsComponent } from './rentals/rentals.component';
import { TempComponent } from './temp/temp.component';
import { RentalModule } from './rentals/rental.module';


const routes: Routes =[
  {path: '', redirectTo:'/rentals', pathMatch:'full'},
  {path: 'temp',component:TempComponent}
  
];

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    TempComponent
  ],
  imports: [
    RouterModule.forRoot(routes),
    BrowserModule,
    AppRoutingModule,
    RentalModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
