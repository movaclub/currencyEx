import {Rates} from "./rates";

export interface Datum {
  toDay: string;          // today
  yesterDay: string;      // next to to-day
  monthAgo: string;       // last in the month's range (from lastMonthSet)
  curBase: string;        // current currency base
  latestSet: Rates;       // latest default base set
  lastMonthSet: Rates;    // calculated from latest last month set

  lastDay: string;        // latest api today
  lastYstrDay: string;    // latest api yesterday
  lastDaySet: any;        // latest api today's data set
  lastYstrDaySet: any;    // latest api yesterday's data set

  // page 1
  initList: any;          // start page data set, incl. 'increase/decrease'
  chartSet: any;          // chart column data set: base<->one currency picked

  // page 2
  curBaseChartSet: any;   // chart for base for 30 days

  // page 3
  topsBaseChartSet: any;  // top 5 to base chart set today-yesterday

}
