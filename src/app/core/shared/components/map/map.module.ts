import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/modules/shared/shared.module';
import { MapComponent } from './map.component';
import {MatButtonModule} from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';



@NgModule({
  declarations: [
    MapComponent
  ],
  imports: [
  SharedModule,
  MatButtonModule,
  MatProgressSpinnerModule
  ],
  exports: [
    MapComponent
  ]
})
export class MapModule { }
