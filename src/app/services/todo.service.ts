import { environment } from './../../environments/environment.development';
import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  private _baseUrl = environment.urlApi;
  public todos$ = new BehaviorSubject<Todo[]>([]);
  public todo$ = new BehaviorSubject<Todo>({"id":0,  "done":false, "text":"", editable:false});

  constructor(private _http: HttpClient) {
    this.findAll();
  }


  public findAll() {
    this._http
      .get<Todo[]>(this._baseUrl+'todos')
      .subscribe(todosFromApi => {
        this.todos$.next(todosFromApi);
      });
  }


  public addOne(data:Todo){
    let newTodo = {text:data.text, done:data.done?true:false, id:0}
  
    this._http.post<Todo>(this._baseUrl+'todos/', newTodo)
    .subscribe(todosFromApi => {
      this.todos$.next([todosFromApi, ...this.todos$.value]);
    });
    
  }


  public removeOne(todo:Todo){

    this.todos$.value.splice(this.todos$.value.findIndex(elm => elm == todo), 1);

    this._http.delete<Todo>(this._baseUrl + 'todos/' + todo.id)
    .subscribe(todosFromApi => {
      this.todos$.next([...this.todos$.value]);
    });

    this.todo$.next({"id":0,  "done":false, "text":"", editable:false});

  }


  public updateOne(todo:Todo){
    this._http.put<Todo>(this._baseUrl+'todos/'+todo.id, todo).subscribe(update => {
       this.todos$.value.find(updTodo => updTodo.id == todo.id);
    })
  }

  public detailOne(todo: Todo){
    this.todo$.next(todo);      
  }
}