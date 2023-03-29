import { Subscription } from 'rxjs';
import { MovieService } from 'src/app/services/movie-service.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Movie } from 'src/app/models/movie';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit, OnDestroy {
  txtSearch!:string;
  lstMovies !: Movie[];
  private _sub !:Subscription;

  constructor(private _movieService: MovieService){
  }

  onSearch(){
    console.log(this.lstMovies);
    console.log(this.txtSearch);
    this._movieService.getOneByName(this.txtSearch);
  }
  
  ngOnInit(){
    this._sub = this._movieService.movies$.subscribe(
      moviesDatas => {
        this.lstMovies = moviesDatas;
      }
    );
  }

  ngOnDestroy(): void {
    this._sub.unsubscribe();
  }

}
