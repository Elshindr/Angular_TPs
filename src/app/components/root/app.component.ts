import { Component, Output, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Increment';
  i!: number;

  constructor(){
    this.i = 0;
  }

  getIncrement(event:any){
    this.i = event;
  }
}
