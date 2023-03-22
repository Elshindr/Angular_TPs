import { TodoService } from '../../services/todo.service';
import { Component } from '@angular/core';
import { Todo } from 'src/app/models/todo';


@Component({
  selector: 'app-footer',
  template: `
  <hr>
  <footer>
    <div *ngFor="let todo of todos$ |async">{{ todo.text }}</div>
  </footer>
  `,
  styles: [
  ]
})
export class FooterComponent{
  todos: Todo[] = [];
  todos$ = this._todoService.todos$;

  constructor(private _todoService:TodoService){

  }


}
