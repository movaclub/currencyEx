import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from "./views/home.component";
import { LastComponent } from "./views/last.component";
import { TopsComponent } from "./views/tops.component";
import { HistComponent } from "./views/hist.component";


const routes: Routes = [
  {path: '', redirectTo: '/home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent},
  {path: 'hist/:curSec', component: HistComponent},
  {path: 'last', component: LastComponent},
  {path: 'tops', component: TopsComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
