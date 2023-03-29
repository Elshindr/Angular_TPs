export class Movie{
  constructor(
    public id:number,
    public titre:string,
    public description:string,
    public categorie:string,
    public nbJaimes = 0,
    public favoris:boolean,
    public img: string
  ){}
}