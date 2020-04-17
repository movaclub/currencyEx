export interface Initlist {

  base: string; // current/default base

  dataSet: {currency: string; spot: number; shift: number}[];
  // currency, spot - lastDate value, shift: lastDay-lastYstrDay

  baseSet: string[]; // Base selector set
  
}
