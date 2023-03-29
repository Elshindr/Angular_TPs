import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { Todo } from 'src/app/models/todo';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-tododetails',
  templateUrl: './tododetails.component.html',
  styleUrls: ['./tododetails.component.css']
})
export class TodoDetailsComponent {
  public todo!:Todo;
  _sub!: Subscription;

  constructor(private _todoService: TodoService) {}

  ngOnInit(){
    this._sub = this._todoService.todo$.subscribe(
        todo => {
          this.todo = todo;
        }
    );
  }

  ngOnDestroy(){
    this._sub.unsubscribe();
  }

  onRemove(){
    this._todoService.removeOne(this.todo);
  }


  editTodo(text:string) {
    
    console.log("editing todo...");

    this.todo.editable = !this.todo.editable;

    if(!this.todo.editable){
      this.todo.text = text;
      console.log(this.todo);
      this._todoService.updateOne(this.todo);
    } 
  }
}
