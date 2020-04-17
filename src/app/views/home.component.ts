import { Component, OnInit } from '@angular/core';
import { ApiService } from "../services/api.service";

@Component({
  selector: 'curEx-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public curBase: string;

  constructor( private datum: ApiService ) {
    this.curBase        = 'EUR';
  }

  ngOnInit(): void {
    // this.datum.getDataSets(this.curBase);
  }


}
