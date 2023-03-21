import { Component } from '@angular/core';

@Component({
  selector: 'app-todolst',
  templateUrl: './todolst.component.html',
  styleUrls: ['./todolst.component.css'],
})
export class TodoLstComponent {
  title = "Ma liste des taches";
  myArray = [
    {text: "Faire la vaiselle", done: false}, 
    {text: "Faire une todolist sur angular", done: false}, 
    {text: "Rendre la todo list interactive?", done: false}, 
    {text: "Faire chauffer l'eau pour un futur café", done: true}, 
    {text: "Racheter du café", done: false}, 
    {text: "Manger", done : true}
];

  newVal = "";
  indexVal = null;


  addElmtTodoLst(){
    if(this.newVal != ""){
      let newTodo = {text:this.newVal==null?"nik":this.newVal, done:false, focused: false}
      this.myArray.push(newTodo);
      this.newVal= "";
    }
  }


  removeElmtTodoLst(i:number){
    this.myArray.splice(i, 1);
  }


  changeDone(index: number){
    this.myArray[index].done = !this.myArray[index].done;
  }
  /*
  changeDone(todo:Object){
    todo.done = ! todo.done;
  }*/
}
