import { Component, OnInit } from '@angular/core';
import {Datum} from "../interfaces/datum";
import {ApiService} from "../services/api.service";

@Component({
  selector: 'curEx-tops',
  templateUrl: './tops.component.html',
  styleUrls: ['./tops.component.css']
})
export class TopsComponent implements OnInit {

  public curBase: string;
  public datum: Datum;
  public order: string;

  constructor( private api: ApiService ) {
    this.curBase  = 'EUR';
    this.order    = 'asc';
  }

  ngOnInit(): void {
    this.api.getDataSets(this.curBase);
    this.api.getDataSub$().subscribe(
      rez => {
        this.datum = rez;
      },
      error => console.log(error)
    );
  }

}
