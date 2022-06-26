import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@services/facade.service';
import { Statistic } from '@models/statistic';
import { map } from 'rxjs/operators';
import COUNTRY_CODES from "@constants/country-codes";
import { AppRoutes } from '@constants/app-routes';
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  countriesData?: Statistic[];
  golobalData?: Statistic;
  countryCode = COUNTRY_CODES;
  isCountriesError = false;
  isGlobalDataError = false;

  get isError (): boolean {
    return this.isCountriesError && this.isGlobalDataError;
  }

  sortByProparty: (obj: Statistic) => any  = (obj: Statistic): any => obj.cases.active;
  sortDirection: 'asc' | 'desc' = 'desc';

  // countriesData$ = this.facadeService.statisticService.get().pipe(
  //   map(x => {
  //     this.countriesData = x.response;
  //     return x.response;
  //   }));

  //   golobalData$ = this.facadeService.statisticService.get().pipe(
  //   map(x => {
  //     this.golobalData = x.response[0];
  //     return x.response[0];
  //   }));

  get midConditionsCount(): number {
    return (this.golobalData?.cases?.active ?? 0) - ((this.golobalData?.cases?.critical ?? 0));
  }
  get remainingCount(): number {
    return (this.golobalData?.cases?.total ?? 0) - ((this.golobalData?.deaths?.total ?? 0))  - ((this.golobalData?.cases?.recovered ?? 0));
  }

  get appRoutes(): typeof AppRoutes {
    return AppRoutes;
  }
  constructor(private facadeService: FacadeService,) { }

  ngOnInit(): void {
    this.getCountriesData();
    this.getGlobalData();

  }

  getCountriesData(): void {
    this.facadeService.statisticService.get().pipe(map(x => {
      x.response = x.response.filter(r => r.country != r.continent);
      return x;
    })).subscribe({
      next: (data) => {
        console.table(data);
        this.countriesData = data.response;
      },
      error: (err) => {
        this.isCountriesError = true;
      }
    });
  }

  trackBy(index: number, item: Statistic): string {
    return item.country;
  }

  getGlobalData(): void {
    this.facadeService.statisticService.get({
      country: 'All'
    }).subscribe({
      next: (data) => {
        console.table(data);
        this.golobalData = data.response[0];
      },
      error: (err) => {
        this.isGlobalDataError = true;
      }
    });
  }

  sortBy(sortBy: 'new deaths' | 'deaths' | 'new cases' | 'total cases' | 'active casee' | 'recovered' | 'critical' ): void {
    switch (sortBy) {
      case 'new deaths':
        this.sortByProparty = (obj: Statistic) => obj.deaths.new;
        break;
      case 'deaths':
        this.sortByProparty = (obj: Statistic) => obj.deaths.total;
        break;
      case 'new cases':
        this.sortByProparty = (obj: Statistic) => obj.cases.new;
        break;
      case 'total cases':
        this.sortByProparty = (obj: Statistic) => obj.cases.total;
        break;
      case 'active casee':
        this.sortByProparty = (obj: Statistic) => obj.cases.active;
        break;
      case 'recovered':
        this.sortByProparty = (obj: Statistic) => obj.cases.recovered;
        break;
      case 'critical':
        this.sortByProparty = (obj: Statistic) => obj.cases.critical;
        break;
      default:
        this.sortByProparty = (obj: Statistic) => obj.cases.active;
        break;
    }
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
  }

}
