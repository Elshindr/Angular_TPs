import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Todo } from "src/app/models/todo";
import { TodoService } from "src/app/services/todo.service";
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { User } from 'src/app/models/user';

@Component({
  selector: 'app-todolst',
  templateUrl: './todolst.component.html',
  styleUrls: ['./todolst.component.scss'],
})

export class TodolstComponent implements OnInit, OnDestroy {
  lstTodos: Todo[] = [];
  lstTodosDone: Todo[]=[];
  lstTodosCurr: Todo[]=[];

  lstCategories: string[] = [];
  error:string = "";
  curUser!: User; 

  private _subTodo!: Subscription;
  private _subUser!: Subscription;
  private _subRoute!: Subscription;

  constructor(private _userService: UserService, private _todoService: TodoService, private _router: Router, private _route: ActivatedRoute) {
  }



  onSelectCategorie(categorie: string) {

    this._subTodo = this._todoService.lstTodos$.subscribe(
      todosDatas => {
        this.lstTodos = todosDatas;
      }
    );

    console.log(this.lstCategories)
    if(categorie != "All"){
      console.log("not all")
      this.lstTodos = this.lstTodos.filter(todo => todo.categorie == categorie);
      
    }
    this.setLstsTodos();
  }


  onChangeDone(todo: Todo) {
    todo.done = !todo.done;
    this._todoService.updateOne(todo).subscribe({
      next: (nwTodo: Todo) => {
        console.log("OK")
      },
      error: () => {
        console.log("FAIL MODIF DONE");
      }
    })
  }


  onSubmitAddTodo(form: NgForm) {
    if (form.valid) {
      const todo = new Todo(form.value.text, form.value.done, form.value.categorie.toLowerCase(), this.curUser.id);
      this._todoService.addOne(todo).subscribe({
        next: (nwTodo: Todo) => {
          this.setLstCategories();
          form.reset();
        },
        error: () => {
          this.error = "Erreur dans la création";
          console.log("FAIL CREATION TODO");
        }
      });
    }
  }


  setLstCategories(){
    this.lstTodos.forEach( todo =>{
      if(!this.lstCategories.includes(todo.categorie)){
        this.lstCategories.push(todo.categorie);
      }
          
    });
  }


  setLstsTodos(){
    this.lstTodosCurr = [];
    this.lstTodosDone = [];

    this.lstTodos.forEach(elm => {
      
      if(elm.done){
        this.lstTodosDone.push(elm);
      }else if (!elm.done){
        this.lstTodosCurr.push(elm);
      }
    });
  }


  ngOnInit() {
    console.log("=== list init");
    let idUser = "";

    this._subRoute = this._route.params.subscribe(params => {
      console.log(params) ;
      idUser = params['idUser'];
    });

    
    this.curUser = new User("", "");
    this.curUser.id = parseInt(idUser);

    if(idUser != ""){
      console.log(idUser);
      this._todoService.getAllTodosByIdUser(parseInt(idUser));
        
      this._subTodo = this._todoService.lstTodos$.subscribe(
        todo => {
          this.lstTodos = todo;
          this.setLstsTodos();
          this.setLstCategories();
        }
      );

    } 
    
    
    /*else{
      this._subUser = this._userService.curUser$.subscribe(
        user => {
          this.curUser = user;

          setTimeout(() => {
            this._subTodo = this._todoService.lstTodos$.subscribe(
              todos => {
                this.lstTodos = todos;
                this.setLstCategories();
                this.setLstsTodos();
              }
            )
          }, 2000);
        }
      );
    }*/
    

    
  }

  ngOnDestroy() {
    this._subTodo.unsubscribe();
  }
}
