import { Component, EventEmitter, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent {
  @Output() sendIncrement = new EventEmitter();
  i!:number;
  constructor(){
    this.i = 0;
    console.log("i init:" +this.i);
    this.sendIncrement.emit(this.i);
  }

  incremUpper(){
    this.i++;
    console.log("i add:" +this.i);
    this.sendIncrement.emit(this.i);
  }

  incremLower(){
    this.i--;
    console.log("i suppr:" +this.i);
    this.sendIncrement.emit(this.i);
  }
}
