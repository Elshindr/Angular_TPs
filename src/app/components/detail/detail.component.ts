import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Movie } from 'src/app/models/movie';
import { MovieService } from 'src/app/services/movie-service.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent {
  id!: number;
  movie !: Movie;
  private _subUrl!: Subscription;
  private _sub!: Subscription;

  constructor(private _movieService: MovieService, private route: ActivatedRoute) {
    this._subUrl = this.route.queryParams.subscribe(params => {
      this.id = this.route.snapshot.params['id'];
    });
  }

  onLike(movie: Movie) {
    movie.nbJaimes = movie.nbJaimes + 1;
    this._movieService.updateOne(movie);
  }

  onAddfav(movie: Movie) {
    movie.favoris = !movie.favoris;
    this._movieService.updateOne(movie);
  }


  ngOnInit() {
    this._sub = this._movieService.movie$.subscribe(
      movieDatas => {
        this.movie = movieDatas;
      }
    );

    console.log(this.id);

    if (this.movie.titre == "" || this.movie.titre == "undefined") {
      this._movieService.getOneById(this.id);
    }
  }

  ngOnDestroy() {
    this._sub.unsubscribe();
    this._subUrl.unsubscribe();
  }
}
