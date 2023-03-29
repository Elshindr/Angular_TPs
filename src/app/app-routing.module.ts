import { NgModule, Component } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { DetailComponent } from './components/detail/detail.component';
import { FavorisComponent } from './components/favoris/favoris.component';
import { HomeComponent } from './components/home/home.component';
import { ListeComponent } from './components/liste/liste.component';


const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'lst', component: ListeComponent },
  { path: 'fav', component: FavorisComponent },
  { path: 'detail', component: DetailComponent},
  { path:'detail/:id', component: DetailComponent},
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
