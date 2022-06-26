import { forwardRef, InjectionToken, ModuleWithProviders, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {  HttpClient, HttpClientModule, HTTP_INTERCEPTORS, } from '@angular/common/http';
import { environment } from '@environments/environment';
import { StatisticService } from './statistic/statistic.service';
import { BackendInterceptor } from './backend.interceptor';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    HttpClientModule,
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true},
  ]
})
export class BackendModule {
  static forRoot(): ModuleWithProviders<BackendModule> {
    return {
        ngModule: BackendModule,
    };
}
}
