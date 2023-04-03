import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { TododetailComponent } from './components/tododetail/tododetail.component';
import { TodolstComponent } from './components/todolst/todolst.component';

const routes: Routes = [
  { path: 'home/:idUser', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'liste/:idUser/:id', component: TododetailComponent },
  { path: 'liste/:idUser', component: TodolstComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home'},
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
