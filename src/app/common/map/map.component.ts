import { Component, Input, ChangeDetectorRef } from '@angular/core';
import { MapService } from './map.service';


@Component({
  selector: 'bwm-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css']
})
export class MapComponent {

  @Input() location:string;
  constructor(private mapService: MapService, private ref:ChangeDetectorRef) { }
  lat:number;
  lng:number;
  isPositionError:boolean = false;

  ngOnInit(): void {
  }
  mapReadyHandler(){
    this.mapService.getGeoLocation(this.location).subscribe(
      (coordinates)=>{
        this.lat = coordinates.lat;
        this.lng = coordinates.lng;
        this.ref.detectChanges();
      }
      ,()=>{
        this.isPositionError = true;
      }
    );
  }

}
