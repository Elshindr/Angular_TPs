import { Subscription } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-todoform',
  templateUrl: './form-todo.component.html',
  styleUrls: ['./form-todo.component.css']
})
export class FormTodoComponent implements OnInit {

  constructor(private _todoService: TodoService) {
  }

  ngOnInit(): void {
  }

  onSubmitAdd(form: NgForm) {
    if (form.valid) {
      this._todoService.addOne(form.value);
      form.reset();
    }
  }

}