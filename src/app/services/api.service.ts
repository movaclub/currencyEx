import {Injectable, OnDestroy} from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {BehaviorSubject, Observable, of, Subscription} from "rxjs";
import { Rates } from "../interfaces/rates";
import { Datum } from "../interfaces/datum";
import { Chartset } from "../interfaces/chartset";
import {Initlist} from "../interfaces/initlist";

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
  private subjDatum: BehaviorSubject<Datum>;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://api.exchangeratesapi.io/';
    this.datum = {
      toDay: '',
      yesterDay: '',
      monthAgo: '',
      curBase: 'EUR',
      baseSet: [],
      latestSet: null,
      lastMonthSet: null,
      lastMonthDates: [],
      lastDay: '',
      lastYstrDay: '',
      lastDaySet: null,
      lastYstrDaySet: null,
      initList: null,
      chartSet: null,
      curBaseChartSet: null,
      topsBaseChartSet: null
    };
    this.subjDatum = new BehaviorSubject<Datum>(this.datum);
  }

  getDataSub$(): Observable<Datum> {
    return this.subjDatum.asObservable();
  }

  // api yester-/today sets
  getApiDays(): void {
    this.datum.lastMonthDates = [...(Object.keys( this.datum.lastMonthSet.rates))].sort();
    this.datum.lastDay        = this.datum.lastMonthDates[this.datum.lastMonthDates.length-1];
    this.datum.lastYstrDay    = this.datum.lastMonthDates[this.datum.lastMonthDates.length-2];
    this.datum.lastDaySet     = this.datum.lastMonthSet.rates[this.datum.lastDay];
    this.datum.lastYstrDaySet = this.datum.lastMonthSet.rates[this.datum.lastYstrDay];
  }

  // get data sets ready
  getDataSets(base: string): void {
    this.datum.curBase = base;
    this.getDatum(this.datum.curBase);
    this.subjDatum.next(this.datum);
    // return this.subjDatum.asObservable();
  }

  // get initial data sets & calc date ranges
  getDatum(base: string): void {

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
          this.datum.baseSet = [...(Object.keys( this.datum.latestSet.rates))];
          this.datum.baseSet.unshift(this.datum.curBase);
          this.subjDatum.next(this.datum);
        },
        error => console.log('api-error:', error)
      );

    this.apiLastMonth = this.getData({
      base: this.datum.curBase,
      start: this.datum.monthAgo,
      end: this.datum.toDay});

    this.subsAPILastMonth = this.apiLastMonth
      .subscribe(
        async dat => {
          this.datum.lastMonthSet = dat;
          await this.getApiDays();
          this.datum.initList = await this.createInitList();
          this.subjDatum.next(this.datum);
        },
        error => console.log('apiLast-error:', error)
      );

  }

  createChartData( secCur: string ) {
    this.datum.chartSet = this.createChartDataSet(secCur);
    this.subjDatum.next(this.datum);
  }

  private createInitList(): Initlist {
    let initList: Initlist = {dataSet: []};
    for(let [key, value] of Object.entries(this.datum.lastDaySet)) {
      initList.dataSet.push( {currency: key, spot: value, shift: parseFloat((+value - this.datum.lastYstrDaySet[key]).toFixed(6).toString())} );
    }
    return Object.assign({}, initList);
  }

  private createChartDataSet( secCur: string ): Chartset {
    // @ts-ignore
    let tmp: Chartset = {secCur, labels: [], dataSet: []};
    for(let day of this.datum.lastMonthDates) {
      tmp.labels.push(day);
      tmp.dataSet.push(this.datum.lastMonthSet.rates[day][secCur].toString());
      // tmp.chartData.push({
      //   date: day,
      //   y: this.datum.lastMonthSet.rates[day][secCur]
      // });
    }
    return tmp;
  }

  // api queries
  private getData(params: {start?: string; end?: string; base:string}): Observable<Rates> {
    // console.log('getData-params:', params);
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
