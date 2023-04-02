import { User } from 'src/app/models/user';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit, OnDestroy{
  _subUser !: Subscription;
  curUser !: User;
  lstUser !: User[];

  constructor(private _userService: UserService){
  }

  ngOnInit(): void {
    this._subUser = this._userService.lstUsers$.subscribe(
        lstUser => {
        this.lstUser = lstUser;
        this.curUser = this.lstUser[0];
      }
    );
  }

  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }

}
