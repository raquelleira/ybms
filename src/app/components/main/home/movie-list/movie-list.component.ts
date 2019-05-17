import { Component, OnInit } from '@angular/core';

import { Movie } from '../../shared/models/movie.model';
import { MovieService } from '../../shared/movie.service';

@Component({
  selector: 'app-movie-list',
  templateUrl: './movie-list.component.html',
  styleUrls: ['./movie-list.component.scss']
})
export class MovieListComponent implements OnInit {

    public movies: Movie[];

    constructor(
        private _movieService: MovieService
    ) { }

    /**
     * Init component view
     * @returns {void}
     */
    public ngOnInit(): void {
        this._getMovieList();
    }

    /**
     * Gets the movie list and populates a data source
     * @returns {void}
     */
    private _getMovieList(): void {
        this._movieService.getMovies().then(movies => this.movies = movies);
    }

}
