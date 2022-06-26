import { Injectable } from '@angular/core';
import { StatisticsParameters } from '@models/api-parameters';
import { Statistic } from '@models/statistic';
import { BackendModule } from '../backend.module';
import { BaseApiService } from '../base-api.service';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { APIResponse } from '@models/api-response';
import COUNTRY_CODES from "@constants/country-codes";

@Injectable({
  providedIn: BackendModule,
})
export class StatisticService extends BaseApiService<Statistic, StatisticsParameters> {
  get endpoint(): string {
    return 'statistics';
  }

  override get(parameters?: StatisticsParameters) {
    return super.get(parameters).pipe(map(data => {
      data.response.forEach(x => {
        x.countryName =  x.country?.replace(/-/g, ' ');
        x.continentName =  x.continent?.replace(/-/g, ' ');
        x.countryCode = (COUNTRY_CODES as any)[x.country];
      });
      return data;
    }));
  }
}
