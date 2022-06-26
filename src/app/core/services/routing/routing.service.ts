import { Injectable } from '@angular/core';
import { Router, NavigationStart, NavigationEnd, NavigationCancel, NavigationError } from '@angular/router';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoutingService {
  private isLoading = new BehaviorSubject<boolean>(false);
  $isLoading = this.isLoading.asObservable();
  constructor(private router: Router) { this.init(); }
  init(): void {
    this.router.events.subscribe(
      (event) => {
      // console.log(event);

      switch (true) {
        case event instanceof NavigationStart: {
          this.isLoading.next(true);
          break;
        }

        case event instanceof NavigationEnd:
        case event instanceof NavigationCancel:
        case event instanceof NavigationError: {
          this.isLoading.next(false);
          break;
        }
        default: {
          break;
        }
      }
    });
  }
}
