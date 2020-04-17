import {Component, OnInit} from '@angular/core';
import { ApiService } from "./services/api.service";
import { Datum } from "./interfaces/datum";
import {Observable} from "rxjs";

@Component({
  selector: 'curEx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{

  public curBase: string;
  public baseSet: any;
  public datum: Datum;
  selectedCurrency: any;

  constructor(private api: ApiService) {
    this.curBase = 'USD';
  }

  ngOnInit(): void {
    this.api.getDataSets(this.curBase)
      .subscribe(
        rez => {
          this.datum = rez;
          this.baseSet = rez.baseSet;
          this.selectedCurrency = this.baseSet[0];
          console.log('ngOnInit-datum: ', this.datum);
        },
        error => console.log(error)
      );
    console.log('ngOnInit-selectedCurrency: ', this.selectedCurrency);
  }

  onOptionSelected(): void {
    console.log('onOptionSelected-selectedCurrency: ', this.selectedCurrency);
    this.curBase = this.selectedCurrency;
    this.api.getDataSets(this.selectedCurrency)
      .subscribe(
        rez => {
          this.datum = rez;
          this.baseSet = rez.baseSet;
          this.selectedCurrency = this.baseSet[0];
          console.log('onOptionSelected-datum: ', this.datum);
        },
        error => console.log(error)
      );
  }


}
