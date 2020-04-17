import {Component, OnInit} from '@angular/core';
import { ApiService } from "./services/api.service";
import { Datum } from "./interfaces/datum";

@Component({
  selector: 'curEx-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']

})
export class AppComponent implements OnInit{

  public curBase: string; // default value
  public baseSet: any;
  public datum: Datum;

  constructor(private api: ApiService) {
    this.curBase = 'EUR';
  }

  ngOnInit(): void {
    this.datum = this.api.getDataSets(this.curBase);
    console.log('AppComponent-datum:', this.datum);
    const datKeys = Object.keys(this.datum);
    console.log('AppComponent-datKeys:', datKeys);
    if ( 'baseSet' in this.datum ) {

      this.baseSet = this.datum['baseSet'];
      console.log('AppComponent-baseSet:', this.baseSet);
      console.log('AppComponent-datum.baseSet:', this.datum.baseSet);
    } else {
      console.log('NO AppComponent-baseSet!');
    }
  }


}
