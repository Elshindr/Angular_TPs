import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todoform',
  templateUrl: './todoform.component.html',
  styleUrls: ['./todoform.component.css']
})
export class FormTodoComponent  {

  constructor(private _todoService: TodoService) {
  }


  onSubmitAdd(form: NgForm) {
    if (form.valid) {
      this._todoService.addOne(form.value);
      form.reset();
    }
  }
}