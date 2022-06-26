import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CountryRoutingModule } from './country-routing.module';
import { CountryComponent } from './country.component';
import { SharedModule } from '@shared/modules/shared/shared.module';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import {MatButtonModule} from '@angular/material/button';


@NgModule({
  declarations: [
    CountryComponent
  ],
  imports: [
    SharedModule,
    CountryRoutingModule,
    MatProgressSpinnerModule,
    MatButtonModule
  ]
})
export class CountryModule { }
