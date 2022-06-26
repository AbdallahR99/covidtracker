import { inject, Injectable, Injector } from '@angular/core';
import { CountryService } from './backend/country/country.service';
import { HistoryService } from './backend/history/history.service';
import { StatisticService } from './backend/statistic/statistic.service';
import { LocalStorageService } from './local-storage/local-storage.service';
import { RoutingService } from './routing/routing.service';

@Injectable({
  providedIn: 'root'
})
export class FacadeService {
  private _statisticService!: StatisticService;
  private _historyService!: HistoryService;
  private _countryService!: CountryService;
  private _routingService!: RoutingService;
  private _localStorageService!: LocalStorageService;

  constructor(private injector: Injector) { }

  // API Services
  public get countryService(): CountryService {
    if (!this._countryService) {
      return this._countryService = this.injector.get(CountryService);
    }
    return this._countryService;
  }
  public get statisticService(): StatisticService {
    if (!this._statisticService) {
      return this._statisticService = this.injector.get(StatisticService);
    }
    return this._statisticService;
  }
  public get historyService(): HistoryService {
    if (!this._historyService) {
      return this._historyService = this.injector.get(HistoryService);
    }
    return this._historyService;
  }


  // Common Services
  public get routingService(): RoutingService {
    if (!this._routingService) {
      return this._routingService = this.injector.get(RoutingService);
    }
    return this._routingService;
  }

  public get localStorageService(): LocalStorageService {
    if (!this._localStorageService) {
      return this._localStorageService = this.injector.get(LocalStorageService);
    }
    return this._localStorageService;
  }
}
