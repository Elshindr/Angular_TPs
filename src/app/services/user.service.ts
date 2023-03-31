import { HttpClient, HttpParams } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { Injectable } from '@angular/core';
import { User } from '../models/user';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  private _baseUrl = environment.urlApi+"/users/";

  public lstUsers$ = new BehaviorSubject<User[]>([]);
  public curUser$  = new BehaviorSubject<User>(new User("", ""));

  constructor(private _http:HttpClient) {
    this.getAll();
  }


  public getAll() :void{
    this._http.get<User[]>(this._baseUrl).subscribe(allUsers => {
      this.lstUsers$.next(allUsers)
    });
  }

  public getOneById(id: number) {

    this._http.get<User>(this._baseUrl + '/' + id).subscribe(user => {
      this.curUser$.next(user);
    });
  }

  public getOneByName(name: string) {
    let params = new HttpParams();
    params = params.append('name', name);
    //params = params.append('pwd', pwd);
    this._http.get<User>(this._baseUrl, { params: params }).subscribe(user => {
      this.curUser$.next(user);
    });
  }


  public addOne(newUser : User){
    console.log("== Add One")
    return this._http.post<User>(this._baseUrl, newUser).pipe(
      tap((user) =>  {
        this.getOneByName(user.name);
      })
    );
  }

  removeOne(id: number){
  }

}