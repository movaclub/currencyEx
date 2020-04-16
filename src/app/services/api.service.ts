import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { Observable, Subscription } from "rxjs";
import { Rates } from "../interfaces/rates";
import { Datum } from "../interfaces/datum";

@Injectable({
  providedIn: 'root'
})
export class ApiService implements OnDestroy {

  private apiUrl: string;
  private datum: Datum;

  private apiLatest: Observable<Rates>;
  private subsAPILatest: Subscription;
  private apiLastMonth: Observable<Rates>;
  private subsAPILastMonth: Subscription;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://api.exchangeratesapi.io/';
    this.datum = {
      toDay: '',
      yesterDay: '',
      monthAgo: '',
      curBase: '',
      latestSet: null,
      lastMonthSet: null,
      lastDay: '',
      lastYstrDay: '',
      lastDaySet: null,
      lastYstrDaySet: null,
      initList: null,
      chartSet: null,
      curBaseChartSet: null,
      topsBaseChartSet: null
    };
  }

  // get data sets ready
  getDataSets(base: string): Datum {
    this.getDatum(base);
    console.log('getDataSets-datum:', this.datum);
    return this.datum;
  }

  // get initial data sets & calc date ranges
  private getDatum(base: string): Datum {

    this.datum.curBase    = base;
    let rawToDay          = new Date();
    const rawMonthAgo     = new Date( (new Date()).setMonth(rawToDay.getMonth() - 1) );
    const rawYesterDay    = new Date( (new Date()).setDate(rawToDay.getDate() - 1) );
    this.datum.toDay      = new Date().toISOString().split('T')[0];
    this.datum.yesterDay  = rawYesterDay.toISOString().split('T')[0];
    this.datum.monthAgo   = rawMonthAgo.toISOString().split('T')[0];

    this.apiLatest = this.getData({base: this.datum.curBase});

    this.subsAPILatest = this.apiLatest
      .subscribe(
        dat => {
          this.datum.latestSet = dat;
        },
        error => console.log('api-error:', error)
      );

    this.apiLastMonth = this.getData({
      base: this.datum.curBase,
      start: this.datum.monthAgo,
      end: this.datum.toDay});

    this.subsAPILastMonth = this.apiLastMonth
      .subscribe(
        dat => {
          this.datum.lastMonthSet = dat;
        },
        error => console.log('apiLast-error:', error)
      );

    return this.datum;

  }

  // api queries
  private getData(params: {start?: string; end?: string; base:string}): Observable<Rates> {
    console.log('getData-params:', params);
    let curUrl = (
      'start' in params && 'end' in params ?
        `${this.apiUrl}history?start_at=${params.start}&end_at=${params.end}&base=${params.base}` :
        `${this.apiUrl}latest?base=${params.base}`
    );
    return this.http.get<Rates>(curUrl);
  }

  ngOnDestroy(): void {
    this.subsAPILatest.unsubscribe();
    this.subsAPILastMonth.unsubscribe();
  }

}
