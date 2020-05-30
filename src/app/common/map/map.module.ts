import { NgModule } from '@angular/core';
import { AgmCoreModule } from '@agm/core';
import { CommonModule } from '@angular/common';

import { MapComponent } from './map.component';
import { CamelizePipe } from 'ngx-pipes';
import { NgPipesModule } from 'ngx-pipes';

@NgModule({
    declarations:[
        MapComponent
    ],
    exports:[
        MapComponent
    ],
    imports:[
        AgmCoreModule.forRoot({
            apiKey:"AIzaSyBgV-mkhz5pqHJrtexHQXJdV12D8nGefoI"
            // azmat's google api key AIzaSyBgV-mkhz5pqHJrtexHQXJdV12D8nGefoI
            // course coordinator's google maps api key AIzaSyDW9tFSqG2mA0ym2NluRBVGZ6tPr8xbwRM
        }),
        CommonModule,
        NgPipesModule
    ],
    providers:[CamelizePipe]
})
export class MapModule{

}