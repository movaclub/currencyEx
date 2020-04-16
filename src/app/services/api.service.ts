import { Injectable } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import {Observable, of} from "rxjs";
import {catchError, map} from "rxjs/operators";
import { Rates } from "../interfaces/rates";

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiUrl: string;

  constructor(private http: HttpClient) {
    this.apiUrl = 'https://api.exchangeratesapi.io/';
  }

  getLatest(): Observable<Rates> {
    return this.http.get<Rates>(`${this.apiUrl}latest`);
  }

}
