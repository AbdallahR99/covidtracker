import { Injectable } from '@angular/core';
import { AppStorage } from '@constants/app-storage';
import { CachedResponse } from '@services/backend/base-api.service';

@Injectable({
  providedIn: 'root'
})
export class LocalStorageService {

  constructor() { }

  addAPIKey(key: string) {
    const keys = localStorage.getItem(AppStorage.API_KEYS);
    if (keys) {
      const keysParsed = JSON.parse(keys) as string[];
      keysParsed.push(key);
      localStorage.setItem(AppStorage.API_KEYS, JSON.stringify(keysParsed));
    } else {
      localStorage.setItem(AppStorage.API_KEYS, JSON.stringify([key]));
    }
  }

  removeAPIKey(key: string) {
    const keys = localStorage.getItem(AppStorage.API_KEYS);
    if (keys) {
      const keysParsed = JSON.parse(keys) as string[];
      const index = keysParsed.indexOf(key);
      if (index > -1) {
        keysParsed.splice(index, 1);
        localStorage.setItem(AppStorage.API_KEYS, JSON.stringify(keysParsed));
      }
    }
  }

  clean(): void {
    const keys = localStorage.getItem(AppStorage.API_KEYS);
    if (keys) {
      const keysParsed = JSON.parse(keys) as string[];
      keysParsed.forEach(key => {
        const cacheedResponse = localStorage.getItem(key);
        if (cacheedResponse) {
          const cacheedResponseParsed = JSON.parse(cacheedResponse) as CachedResponse<any, any>;
          const differenceInMinutes = (new Date()?.getTime() - new Date(cacheedResponseParsed.lastUpdated)?.getTime()) / (1000 * 60);
          if (differenceInMinutes >= 15) {
            localStorage.removeItem(key);
            keysParsed.splice(keysParsed.indexOf(key), 1);
          }
        }
      }
      );
      localStorage.setItem(AppStorage.API_KEYS, JSON.stringify(keysParsed));
    }
  }
}
