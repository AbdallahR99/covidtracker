import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, Observable, of } from 'rxjs';
import { APIResponse } from '@models/api-response';
import { APIParameters } from '@models/api-parameters';
import { environment } from '@environments/environment';
import { LocalStorageService } from '@services/local-storage/local-storage.service';
export interface CachedResponse<EntityType, Parameters extends APIParameters> {
  parameters: Parameters;
  data: APIResponse<EntityType, Parameters>;
  lastUpdated: Date,
}
@Injectable()
export abstract class BaseApiService<EntityType, Parameters extends APIParameters> {
  abstract get endpoint(): string;
  protected baseUrl = environment.apiUrl;

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) { }

  get(parameters?: Parameters): Observable<APIResponse<EntityType, Parameters>> {
    // debugger
    const url = `${this.baseUrl}/${this.endpoint}`;
    const localStorageKey = url + JSON.stringify(parameters);
    const cachedResponse = localStorage.getItem(localStorageKey);
    if (cachedResponse) {
      const cachedResponseParsed = JSON.parse(cachedResponse) as CachedResponse<EntityType, Parameters>;
      const differenceInMinutes = (new Date()?.getTime() - new Date(cachedResponseParsed.lastUpdated)?.getTime()) / (1000 * 60);
      if (differenceInMinutes < 15) {
        return of(cachedResponseParsed.data);
      }
    }
    const params = parameters ? new HttpParams({fromObject: JSON.parse(JSON.stringify(parameters))}) : undefined;
    return this.http.get<APIResponse<EntityType, Parameters>>(url, {params}).pipe(
      map(response => {
        try {
          localStorage.setItem(localStorageKey, JSON.stringify({
            data: response,
            parameters: parameters,
            lastUpdated: new Date(),
          } as CachedResponse<EntityType, Parameters>));
          this.localStorageService.addAPIKey(localStorageKey);
        } catch(error) {
          console.warn('the data is too large to be cached');
        }


        return response;
      })
    );
  }
}
