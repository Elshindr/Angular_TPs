import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy{
  currUserId !: number;
  _subUser !: Subscription;
  lstUser !: User[];
  currUser !: User;

  constructor(private _userService : UserService, private _router: Router){
  }

  onGoLstTodos(){
    console.log("== onGolstTodos")
    this._userService.lstUsers$.subscribe(lstUser =>{
      this.currUserId = lstUser[0].id;
    })

    this._router.navigateByUrl('liste/' +  this.currUserId);
  }

  ngOnInit(): void {
    this._userService.lstUsers$.subscribe(lstUser =>{
      this.lstUser  = lstUser;
      this.currUser = this.lstUser[0];
    })
  }


  ngOnDestroy(): void {
    this._subUser.unsubscribe();
  }


}
