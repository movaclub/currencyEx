import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from "@angular/common/http";
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TopsComponent } from './views/tops.component';
import { LastComponent } from './views/last.component';
import { HomeComponent } from './views/home.component';

import { ApiService } from "./services/api.service";
import {FormsModule} from "@angular/forms";
import { HistComponent } from './views/hist.component';

@NgModule({
  declarations: [
    AppComponent,
    TopsComponent,
    LastComponent,
    HomeComponent,
    HistComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
