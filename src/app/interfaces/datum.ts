import {Rates} from "./rates";

export interface Datum {
  toDay: string;          // today
  yesterDay: string;      // next to to-day
  monthAgo: string;       // last in the month's range (from lastMonthSet)
  curBase: string;        // current currency base
  latestSet: Rates;       // latest default base set
  lastMonthSet: Rates;    // calculated from latest last month set
}
