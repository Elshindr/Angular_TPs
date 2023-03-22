import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo  } from "src/app/models/todo";
import {TodoService} from "src/app/services/todo.service";
@Component({
  selector: 'app-todolst',
  templateUrl: './todolst.component.html',
  styleUrls: ['./todolst.component.css'],
})

export class TodoLstComponent implements OnInit, OnDestroy{
  title = "Ma liste des taches";
  myArray: Todo[] = [];
  nbTodos = this.myArray.length;
  private _sub! : Subscription;



  constructor(private _todoService: TodoService) {
    const sub = _todoService.todos$.subscribe(
      todosDatas => this.myArray = todosDatas
    );

    setTimeout(() => {
      console.log("unsub todolst")
      sub.unsubscribe();
    }, 2000);
  
  }

  ngOnInit(){
    console.log("ini todo");

    this._sub = this._todoService.todos$.subscribe(
      todosDatas => this.myArray = todosDatas.slice()
    );

    this.nbTodos = this.myArray.length;
  }

  ngOnDestroy(){
    console.log("destroy todo");
    this._sub.unsubscribe();
  }

  newVal = "";
  indexVal = null;
  

  addElmtTodoLst(){
    if(this.newVal != ""){
      let newTodo = {text:this.newVal==null?"nik":this.newVal, done:false, focused: false}
      this.myArray.push(newTodo);
      this.newVal= "";
      this.nbTodos = this.myArray.length;
    }
  }

  removeElmtTodoLst(i:number){
    this.myArray.splice(i, 1);
    this.nbTodos = this.myArray.length;
  }
/*
  changeDone(index: number){
    this.myArray[index].done = !this.myArray[index].done;
  }*/

  changeDone(todo:Todo){
    todo.done = ! todo.done;
  }
}
