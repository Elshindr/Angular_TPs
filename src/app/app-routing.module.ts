import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { TodoLstComponent } from "./components/todolst/todolst.component";
import { MainComponent } from "./components/main/main.component";


const routes: Routes = [
  { path: 'home', component: MainComponent },
  { path: 'todos', component: TodoLstComponent },
  { path: 'contact', component: MainComponent },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: '**', redirectTo: 'home' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}