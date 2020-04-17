export interface Chartset {
  secCur: string; // 2nd currency
  chartData: [
    {
      date: string;
      value: number; // value currency pair
    }
  ]
}
