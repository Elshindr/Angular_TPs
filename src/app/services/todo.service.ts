import { Injectable } from '@angular/core';
import { Todo } from '../models/todo';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TodoService {

  public todos$ = new BehaviorSubject([    
    new Todo("Faire la vaiselle"),
    new Todo("Faire une todolist sur angular"),
    new Todo("Rendre la todo list interactive?"),
    new Todo("Faire chauffer l'eau pour un futur café"),
    new Todo("Racheter du café"),
    new Todo("Manger")
  ]);


  constructor() {

    const sub = this.todos$.subscribe(() => console.log("sub"));

    setTimeout(() => {
      this.todos$.next([new Todo("Démarrer le programme! o/"), ...this.todos$.value]);
    }, 2000);

    setTimeout(() => {
      console.log("unsub")
      sub.unsubscribe();
    }, 15000);
  }
}