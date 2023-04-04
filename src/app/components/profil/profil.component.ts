import { User } from 'src/app/models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';
import { Router } from '@angular/router';
import { TodoService } from 'src/app/services/todo.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy{
  _subUser !: Subscription;
  curUser !: User;

  onEdit = false;
  editName = "";
  editPwd  = "";
  constructor(private _userService: UserService, private _router: Router, private _todoService:TodoService){
  }


  onRemove(){
    const result = confirm("Etes vous sur de vouloir supprimer votre compte?");
    if(result){

      this._todoService.removeAllByIdUser(this.curUser.id);

      this._userService.removeOne(this.curUser.id);
    }
  }

  editUser(name:string, pwd:string) {
    this.onEdit = !this.onEdit;
    console.log(this.curUser);
    if(!this.onEdit){
      console.log("onsave");
      this.curUser.name = name;
      this.curUser.pwd = pwd;
      console.log(this.curUser);
      this._userService.updateOne(this.curUser).subscribe({
        next: (user) => {
          this.curUser = user;
          console.log("ok update user");
        },
        error: () => {
          console.log("error update user");
        }
      });
      
    } else if (this.onEdit){
      console.log("onEdit");
      console.log(this.curUser);
      this.editName = this.curUser.name;
      this.editPwd = this.curUser.pwd;
    }
  }


  ngOnInit(): void {
    this._subUser = this._userService.user$.subscribe(
        user => {
        this.curUser = user;
      }
    );
  }

  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }

}
