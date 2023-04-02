import { Component } from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  coStatut = false;

  outConnexionStatutReceiver(connexionValue: boolean){
    this.coStatut =connexionValue;
  }
}
