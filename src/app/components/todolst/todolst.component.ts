import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from "src/app/models/todo";
import {TodoService} from "src/app/services/todo.service";

@Component({
  selector: 'app-todolst',
  templateUrl: './todolst.component.html',
  styleUrls: ['./todolst.component.css'],
})

export class TodoLstComponent implements OnInit, OnDestroy{
  myArray: Todo[] = [];
  nbTodos:number = 0;

  src
  private _sub! : Subscription;
  

  constructor(private _todoService: TodoService) {
  }

  changeDone(todo:Todo){
    todo.done = ! todo.done;
    this._todoService.updateOne(todo);
  }

  showDetails(i:number, todo:Todo){
    this._todoService.detailOne(todo);
  }

  addFocusStyle(tag){
    tag.classList.add('focused');
  }
  
  
  ngOnInit(){
    this._sub = this._todoService.todos$.subscribe(
        todosDatas => {
          this.myArray = todosDatas;
          this.nbTodos = this.myArray.length;
        }
    );
  }

  ngOnDestroy(){
    this._sub.unsubscribe();
  }
}
