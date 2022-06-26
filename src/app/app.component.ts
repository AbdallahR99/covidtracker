import { Component, OnInit } from '@angular/core';
import { FacadeService } from '@services/facade.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  host: {
    'class': 'd-md-flex flex-column justify-content-center align-items-center h-100'
  }
})
export class AppComponent implements OnInit {
  constructor(private facadeService: FacadeService,) { }
  ngOnInit(): void {
    this.facadeService.localStorageService.clean();
  }


  get $isLoading(): Observable<boolean> {
    return this.facadeService.routingService.$isLoading;
  }

}
