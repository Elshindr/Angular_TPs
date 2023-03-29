import { Movie } from './../../models/movie';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-liste',
  templateUrl: './liste.component.html',
  styleUrls: ['./liste.component.scss']
})
export class ListeComponent implements OnDestroy, OnInit{
  lstMovies: Movie[] = [];

  private _sub!: Subscription;

  constructor(private _movieService: MovieService)  {
  }

  onLike(movie:Movie){
    movie.nbJaimes = movie.nbJaimes + 1;
    this._movieService.updateOne(movie);
  }

  onAddfav(movie:Movie){
    movie.favoris = !movie.favoris;
    this._movieService.updateOne(movie);
  }
  
  onSeeDetail(movie:Movie){
    this._movieService.getOne(movie);
  }

  ngOnInit(){
    this._sub = this._movieService.movies$.subscribe(
      moviesDatas => {
        this.lstMovies = moviesDatas;
      }
  );
  }

  ngOnDestroy(){
    this._sub.unsubscribe();
  }
}
