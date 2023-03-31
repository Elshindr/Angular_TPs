export class User {
  private _isLogged = false;
  public id!:number;

  constructor(public name:string, public pwd:string){

  }

  public isLogged(){
    if(this._isLogged){
      return true;
    }
    else{
      return false;
    }
  }

  public setId(id :number){
    this.id = id;
  }

}
