import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./views/home.component";
import { TopsComponent } from "./views/tops.component";
import { HistComponent } from "./views/hist.component";

const routes: Routes = [
  {path: '', redirectTo: '/home/EUR', pathMatch: 'full'},
  {path: 'home/:baseCur', component: HomeComponent}, // base currency always
  {path: 'hist/:curSec', component: HistComponent},  // base/default currency
  {path: 'tops', component: TopsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
