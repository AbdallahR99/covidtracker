import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BackendModule } from '@services/backend/backend.module';
import { ErrorModule } from '@shared/components/error/error.module';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    BackendModule,
  ],
  exports: [
    CommonModule,
    BackendModule,
    ErrorModule,
  ]
})
export class SharedModule { }
