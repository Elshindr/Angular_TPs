import { UserService } from './../../services/user.service';
import { Component, EventEmitter, OnDestroy, OnInit, Output } from '@angular/core';
import { Subscription } from 'rxjs';
import { NgForm } from '@angular/forms';
import { User } from 'src/app/models/user';
import { Router } from '@angular/router';

@Component({
  selector: 'app-connexion',
  templateUrl: './connexion.component.html',
  styleUrls: ['./connexion.component.scss']
})
export class ConnexionComponent implements OnInit, OnDestroy {
  private _subCurUser !: Subscription;
  action = 1;
  curUser !: User;
  lstUser !: User[];

  @Output() outConnexionStatus = new EventEmitter();

  constructor(private _userService: UserService, private _router: Router) {
  }

  onChangeConnect(action: number) {
    this.action = action;
  }

  onSubmitConnect(form: NgForm) {

    if (form.valid) {
      const user = new User(form.value.nameInput, form.value.pwdInput);

      if (this.action == 0) {
        console.log('Creer');

        this._userService.addOne(user).subscribe({
          next: (nwUser: User) => {
            setTimeout(() => {
            console.log("navigate :: userId = "+ nwUser.id)
            console.log(this._userService.lstUsers$);
            this._router.navigateByUrl('liste/' + nwUser.id);
            }, 2000);
          },
          error: () => {
            console.log("FAIL CREATION");
          }
        });

      } else if (this.action == 1) {

        console.log('=== Se co');
        this._userService.getOneByName(user.name);

        setTimeout(() => {
          console.log("apres get one by name curUser");
          console.log(this.curUser);

          this.curUser.logged = true;
          console.log("ertreteter");
          this.outConnexionStatus.emit(true);
          
        }, 3000);

      }
    }
  }

  ngOnInit(): void {
    this._subCurUser = this._userService.lstUsers$.subscribe(
      lstUser => {  
        console.log("=== init Connexion sub user")
        this.lstUser = lstUser;
        this.curUser = this.lstUser[0];
        console.log("user");
        console.log(lstUser);
        console.log("this.curUser");
        console.log(this.lstUser);
      }
    );
  }

  ngOnDestroy(): void {
    this._subCurUser.unsubscribe();
  }
}