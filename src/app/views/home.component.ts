import {Component, OnDestroy, OnInit} from '@angular/core';
import { Observable, Subscription } from "rxjs";
import { ApiService } from "../services/api.service";
import { Rates } from '../interfaces/rates';
import {Data} from "@angular/router";

@Component({
  selector: 'curEx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public latestDate: string; // api->latest.date
  public yesterdayDate: string; // api->oneMonth[1].date, next to latest
  public monthAgo: string;
  public curBase: string;

  constructor( private datum: ApiService ) {}

  ngOnInit(): void {
    this.datum.getDatum('EUR');
  }


}
