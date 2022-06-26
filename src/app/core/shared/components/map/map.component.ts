
import { Component, HostListener, Input, NgZone, OnInit } from '@angular/core';
import { Statistic } from '@models/statistic';
import '@assets/scripts/geochart.js';
import { environment } from '@environments/environment';

declare let google: any;
@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss'],
  // changeDetection: ChangeDetectionStrategy.OnPush
  host: {
    'class': 'd-flex overflow-hidden rounded-3 position-relative h-100'
  }
})
export class MapComponent implements OnInit {
  option: 'cases' | 'deaths' | 'recovered' | 'critical' = 'cases';
  @Input() data: Statistic[] = [];


  constructor(private zone: NgZone,) { }

  ngOnInit(): void {
    this.loadMap();
  }

  loadMap() {
    if (!this.data) return;
    google.charts.load('current', {'packages':['corechart', 'geochart'], 'mapsApiKey': environment.googleApiKey});
    google.charts.setOnLoadCallback((() => {
      this.drawRegionsMap();
      setTimeout(() => {
        // refresh for responsive issue
        this.drawRegionsMap();
      }, 600);
    }).bind(this));

  }

  onChangeOption(option: 'cases' | 'deaths' | 'recovered' | 'critical' = 'cases') {
    this.option = option;
    this.drawRegionsMap();
  }
  @HostListener('window:resize', ['$event']) drawRegionsMap() {
   const getColor = () => {
    switch (this.option) {
      case 'cases':
        return 'rgb(13, 202, 240)';
      case 'deaths':
        return '#ee5253';
      case 'recovered':
        return '#1DD1A1';
      case 'critical':
        return '#ffc107';
      default:
        return 'rgb(13, 202, 240)';
    }
   }

    // debugger;
    const countriesData = [
      ...this.data.map(x => {
        return [
         x.countryName == 'USA' ? 'United States' : x.countryName,

         ...(() => {
          switch (this.option) {
            case 'cases':
              return [
                x.cases?.total ?? 0,
                x.cases?.active ?? 0,
               ];
            case 'deaths':
              return [
                x.deaths?.total ?? 0,
                x.deaths?.new ?? 0,
               ];
            case 'recovered':
              return [
                x.cases?.recovered ?? 0,
                ((x?.cases?.total ?? 0) - ((x?.deaths?.total ?? 0))  - ((x?.cases?.recovered ?? 0))),
               ];;
            case 'critical':
             return [
                x.cases?.critical ?? 0,
                (x?.cases?.active ?? 0) - ((x?.cases?.critical ?? 0)),
               ];;
            default:
              return [
                x.cases?.total ?? 0,
                x.cases?.active ?? 0,
               ];;
          }

         })()
          // x.cases?.recovered ?? 0,
          // x.cases?.active ?? 0,
        ]
      }
        ),
    ];

    const data = google.visualization.arrayToDataTable([
      [
        'Country',
        ...(() => {
          switch (this.option) {
            case 'cases':
              return [
                'Total Cases',
                'Active Cases',
              ];
            case 'deaths':
              return [
                'Total Deaths',
                'New Deaths',
              ];
            case 'recovered':
              return [
                'Total Recovered',
                'Remaining',
              ];
            case 'critical':
              return [
                'Critical Cases',
                'Mild Condition Cases',
              ];
            default:
              return [
                'Total Cases',
                'Active Cases',
              ];
          }

        })()

    ],
      ...countriesData,
    ]);
    const options = {
      // displayMode: 'markers',
      // tooltip: {
      //   textStyle: {color: 'white'},
      //   showColorCode: true
      // },
       backgroundColor: 'rgb(52, 66, 78)',
        colorAxis: {colors: ['#717b83', getColor()],minValue: 0,
        //  maxValue: this.option == 'cases' ? 10000000 : undefined
        },
        // sizeAxis: {
        //   maxValue: 100
        //  },
        // sizeAxis.maxValue: 100,
    };

    const chart = new google.visualization.GeoChart(document.getElementById('regions_div'));

    chart.draw(data, options);
  }

  ngOnDestroy() {

  }

}
