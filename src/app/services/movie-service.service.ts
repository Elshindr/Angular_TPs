import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';
import { Injectable } from '@angular/core';
import { Movie } from '../models/movie';
import { environment } from 'src/environments/environment.development';

@Injectable({
  providedIn: 'root'
})
export class MovieService {

  /* 
  private _baseUrl = "https://moviesdatabase.p.rapidapi.com/titles/x/upcoming"
  private options = {
   headers: {
     'X-RapidAPI-Key': '82c3e490e5msh6c62ffeb40c4d44p18526cjsnc8b6428612ae',
     'X-RapidAPI-Host': 'moviesdatabase.p.rapidapi.com'
   }
 };
  public test$ = new BehaviorSubject<[]>([]);
 */
  private _baseUrl = environment.urlApi + "/movies";
  private options = {};
  public movies$ = new BehaviorSubject<Movie[]>([]);
  public movie$ = new BehaviorSubject<Movie>({ "id": 0, "favoris": false, "titre": "", "nbJaimes": 0, "img": "", "description": "", "categorie": "" });

  constructor(private _http: HttpClient) {
    this.getAll();
  }

  public getAll() {

    this._http.get<[]>(this._baseUrl, this.options)
      .subscribe(moviesApi => {
        this.movies$.next(moviesApi)
      });
  }

  public updateOne(movie: Movie) {
    this._http.put<Movie>(this._baseUrl + '/' + movie.id, movie).subscribe(update => {
      this.movies$.value.find(updmovie => updmovie.id == movie.id);
    })
  }

  public getOne(movie: Movie) {
    this._http.get<Movie>(this._baseUrl + '/' + movie.id, this.options)
      .subscribe(movieApi => {
        this.movie$.next(movieApi)
      });
  }

  public getOneById(id: number) {
    this._http.get<Movie>(this._baseUrl + '/' + id, this.options)
      .subscribe(movieApi => {
        this.movie$.next(movieApi)
      });
  }


  public getOneByName(titre: string) {

    let movie = this.movies$.value.find(tmovie => tmovie.titre.includes(titre));

    if (movie[0] != undefined) {
      this._http.get<Movie>(this._baseUrl + '/' + movie[0].id, this.options)
        .subscribe(movieApi => {
          this.movie$.next(movieApi)
        });
    }
    else {
      console.log(titre + " not found");
    }

  }
}
