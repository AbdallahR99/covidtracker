import { Component, HostListener, OnInit, NgZone } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Statistic } from '@models/statistic';
import '@assets/scripts/geochart.js';
import { History } from '@models/history';
import { environment } from '@environments/environment';
import { AppRoutes } from '@constants/app-routes';
import { Title } from '@angular/platform-browser';

declare let google: any;
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.scss']
})
export class CountryComponent implements OnInit {
  countryData?: Statistic;
  countryHistory?: History[];
  isPieChartLoaded: boolean = false;
  isLineChartLoaded: boolean = false;
  isError = false;
  isChartLoaded = false;
  get notFound() {
    return !this.countryData || !this.countryHistory;
  }
  get midConditionsCount(): number {
    return (this.countryData?.cases?.active ?? 0) - ((this.countryData?.cases?.critical ?? 0));
  }
  get remainingCount(): number {
    return (this.countryData?.cases?.total ?? 0) - ((this.countryData?.deaths?.total ?? 0))  - ((this.countryData?.cases?.recovered ?? 0));
  }

  get appRoutes(): typeof AppRoutes {
    return AppRoutes;
  }

  constructor(private activatedRoute: ActivatedRoute, private ngZone: NgZone, private title: Title) {}

  ngOnInit(): void {
    const data = this.activatedRoute.snapshot.data['resolverData'];
    console.table(data);
    if (data['countryData']) {
      this.countryData = data['countryData'];
      this.title.setTitle(this.countryData?.countryName + 's Covid-19 Statistics');
      this.loadGoogleChart();
    }
    if (data['countryHistory']) {
      this.countryHistory = data['countryHistory'];
    }
    this.isError = data['countryHistoryError'] || data['countryDataError'];
  }


  loadGoogleChart() {
    if (!this.countryData) return;
    google.charts.load('current', {'packages':['geochart', 'corechart', 'controls'], 'mapsApiKey': environment.googleApiKey});
    google.charts.setOnLoadCallback(this.onGoogleChartLoad.bind(this));
  }

  onGoogleChartLoad() {
    this.isChartLoaded = true;
    this.loadCharts();
  }

  @HostListener('window:resize', ['$event'])  loadCharts() {
    if (!this.isChartLoaded) return;
    // this.ngZone.runOutsideAngular(() => {
      this.drawLineChart();
      this.drawPieChart();
    // });
  }

  drawPieChart() {
    this.isPieChartLoaded = false;

    const data = google.visualization.arrayToDataTable([
      ['Case', 'Count'],
      ['Mild Conditions', this.midConditionsCount],
      ['Critical', this.countryData?.cases?.critical],
      ['Active',  this.countryData?.cases?.active],
      ['Deaths', this.countryData?.deaths?.total],
      ['Recovered', this.countryData?.cases?.recovered],
    ]);

    const options = {
      // title: 'Coronavirus Cases'
      sliceVisibilityThreshold: 0,
      chartArea: {
        left: '25%',

        width: '100%',
        height: '100%',
        backgroundColor: {
          strokeWidth: 0,
        },

      },
      backgroundColor: 'rgb(52, 66, 78)',
      legend: {
        textStyle: {
          color: '#fff',
        }
      },
      colors: [
        'rgb(13, 202, 240)',
        '#ffc107',
        '#6c5ce7',
        '#ee5253',
        '#1DD1A1',
      ]
    };

    const chart = new google.visualization.PieChart(document.getElementById('piechart'));
    const onPieChartReady = () => {
      this.isPieChartLoaded = true;
    }
    google.visualization.events.addListener(chart, 'ready', onPieChartReady.bind(this));
    chart.draw(data, options);
  }

  drawLineChart() {
    this.isLineChartLoaded = true;

    // const statisticsData = [...this.countryHistory?.map(history => {
    //   return [
    //     new Date(history.time).toLocaleDateString(),
    //     history.cases.total,
    //     history.deaths.total,
    //   ];
    // })]

    if (!this.countryHistory) return;
    const statisticsData = [
      ...this.countryHistory.map(history => {
        return [
              new Date(history.time),
              history?.cases?.total ?? 0,
              history?.deaths?.total ?? 0,
              history?.cases?.active ?? 0,
              history?.cases?.recovered ?? 0,
              history?.cases?.critical ?? 0,
            ];
          }
        ),
    ];
    const data = google.visualization.arrayToDataTable([
      ['Date', 'Cases', 'Deaths', 'Active', 'Recovered', 'Critical'],
      ...statisticsData,
    ]);

    const options = {
      // title: 'Company Performance',
      // curveType: 'function',
      backgroundColor: 'rgb(52, 66, 78)',

      legend: {
        position: 'bottom',
        textStyle: {
          color: '#fff',
        }
      },
      colors: [
        'rgb(13, 202, 240)',
        '#ee5253',
        '#6c5ce7',
        '#1DD1A1',
        '#ffc107',
      ],

      hAxis: {
        textStyle: {
          color: '#fff',
        },
      },
      vAxis: {
        textStyle: {
          color: '#fff',
        },

      },
      // chartArea: {
      //   height: '100%',
      // }
    };

    const dashboard = new google.visualization.Dashboard(
      document.getElementById('dashboard_div'));

    const dateRangeSlider = new google.visualization.ControlWrapper({
      'controlType': 'DateRangeFilter',
      'containerId': 'filter_div',
      'options': {
        'filterColumnIndex': 0,
        'filterColumnLabel': 'Date ranger filter',
        'ui': {
          'useClass': 'google-date-range',
        }
      }
    });
    const lineChart = new google.visualization.ChartWrapper({
      'chartType': 'LineChart',
      'containerId': 'curve_chart',
      'options': options,
    });
    dashboard.bind(dateRangeSlider, lineChart);
    const onLineChartReady = () => {
      this.isLineChartLoaded = true;
    }
    google.visualization.events.addListener(dashboard, 'ready', onLineChartReady.bind(this));

    dashboard.draw(data);
    // const chart = new google.visualization.LineChart(document.getElementById('curve_chart'));

    // chart.draw(data, options);
  }
}
