import { Injectable } from '@angular/core';
import { HistoryParameters } from '@models/api-parameters';
import { History } from '@models/history';
import { BackendModule } from '../backend.module';
import { BaseApiService } from '../base-api.service';

@Injectable({
  providedIn: BackendModule
})
export class HistoryService extends BaseApiService<History, HistoryParameters> {
  get endpoint(): string {
    return 'history';
  }
}
