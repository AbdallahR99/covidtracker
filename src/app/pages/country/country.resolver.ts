import { Injectable } from '@angular/core';
import {
  Router, Resolve,
  RouterStateSnapshot,
  ActivatedRouteSnapshot
} from '@angular/router';
import { forkJoin, Observable, of, map, catchError } from 'rxjs';
import { FacadeService } from '@services/facade.service';
import { Statistic } from '@models/statistic';
import { History } from '@models/history';

@Injectable({
  providedIn: 'root'
})
export class CountryResolver implements Resolve<any> {
  constructor(private router: Router, private facadeService: FacadeService) {}
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot, ): Observable<any> {
    const country = route.paramMap.get('country')!;
    const stateData = this.router.getCurrentNavigation()?.extras.state;
    return forkJoin({
      countryData: stateData ? of(stateData) : this.facadeService.statisticService
      .get({ country }).pipe(map(x => x.response[0]),
      catchError((error) => {
        console.error(error);
        return of({error: error})
      })),
      countryHistory: this.facadeService.historyService
      .get({ country }).pipe(map(x => x.response),
      catchError((error) => {
        console.error(error);
        return of({error: error})
      })),
    }).pipe(map(result => {
      const countryDataError = result.countryData['error'];
      const countryHistoryError = (result.countryHistory as any)['error'];
      return {
        countryData: !countryDataError ? result.countryData : undefined,
        countryHistory: !countryHistoryError?  result.countryHistory : undefined,
        countryDataError: countryDataError,
        countryHistoryError: countryHistoryError,
      }
    }));
  }
}
