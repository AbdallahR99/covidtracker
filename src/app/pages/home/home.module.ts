import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { SharedModule } from '@shared/modules/shared/shared.module';
import { MapModule } from '@shared/components/map/map.module';
import {MatCardModule} from '@angular/material/card';
import {ScrollingModule} from '@angular/cdk/scrolling';
import {MatListModule} from '@angular/material/list';
import {MatDividerModule} from '@angular/material/divider';
import { FilterModule } from '@pipes/filter/filter.module';
import { FormsModule } from '@angular/forms';
import { SortModule } from '@pipes/sort/sort.module';
import {MatButtonModule} from '@angular/material/button';
import {MatMenuModule} from '@angular/material/menu';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
SharedModule,
    HomeRoutingModule,
    MapModule,
    ScrollingModule,
    MatCardModule,
    MatListModule,
    MatDividerModule,
    FilterModule,
    FormsModule,
    SortModule,
    MatButtonModule,
    MatMenuModule,
    MatProgressSpinnerModule
  ]
})
export class HomeModule { }
