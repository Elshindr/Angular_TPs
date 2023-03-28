import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos$ = new BehaviorSubject<Todo[]>([]);

  constructor(private _http: HttpClient) {
    this.findAll();
  }

  public findAll() {
    this._http
      .get<Todo[]>('http://localhost:3000/todos')
      .subscribe(todosFromApi => {
        this.todos$.next(todosFromApi);
      });
  }

  public addOne(data:Todo){
    let newTodo = {text:data.text, done:data.done==true?true:false, id:0}
  
    this._http.post<Todo>('http://localhost:3000/todos', newTodo)
    .subscribe(todosFromApi => {
      this.todos$.next([todosFromApi, ...this.todos$.value]);
    });
    
  }

  public removeOne(i:number, todo:Todo){
    this.todos$.value.splice(i, 1);
    this._http.delete<Todo>('http://localhost:3000/todos/' + todo.id)
    .subscribe(todosFromApi => {
      this.todos$.next([...this.todos$.value]);
    });
  }

  public updateOne(todo:Todo){
    this._http.put<Todo>('http://localhost:3000/todos/'+todo.id, todo).subscribe(update => {
      const updTodo =  this.todos$.value.find(updTodo => updTodo.id == todo.id);
    })
  }
}