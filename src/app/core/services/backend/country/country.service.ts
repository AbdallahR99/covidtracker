import { Injectable } from '@angular/core';
import { CountriesParameters } from '@models/api-parameters';
import { Country } from '@models/country';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: 'root'
})
export class CountryService extends BaseApiService<Country, CountriesParameters> {
  get endpoint(): string {
    return 'history';
  }
}
