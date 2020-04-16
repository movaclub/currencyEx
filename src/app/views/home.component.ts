import { Component, OnInit } from '@angular/core';
import { Observable } from "rxjs";
import { ApiService } from "../services/api.service";
import { Rates } from '../interfaces/rates';

@Component({
  selector: 'curEx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public curSet: Observable<Rates>;

  constructor( private api: ApiService ) { }

  ngOnInit(): void {
    // @ts-ignore
    this.curSet = this.api.getLatest();
  }

}
