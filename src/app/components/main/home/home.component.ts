import { Component, OnInit } from '@angular/core';

import { MovieService } from '../shared/movie.service';
import { Movie } from '../shared/models/movie.model';
import { Serie } from '../shared/models/serie.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    public isMovieList: boolean = true;
    public viewLoaded: boolean = false;
    public bannerMovie: Movie;
    public bannerSerie: Serie;

    constructor(
        private _movieService: MovieService
    ) { }

    /**
     * Init component view
     * @returns {void}
     */
    public ngOnInit(): void {
        this.loadBanner();
    }

    /**
     * Switches lists
     * @returns {void}
     */
    public toogleList(): void {
        this.isMovieList = !this.isMovieList;
    }

    /**
     * Loads banner info
     * @returns {void}
     */
    public loadBanner(): void {
        Promise.all([
            this._movieService.getMovies(),
            this._movieService.getSeries()
        ])
        .then(([movies, series]) => {
            this._movieService.getMovieById(this.getTopRated(movies).id)
                .then(movie => this.bannerMovie = movie);
            this._movieService.getSerieById(this.getTopRated(series).id)
                .then(serie => this.bannerSerie = serie);
            this.viewLoaded = true;
        });
    }

    /**
     * Gets the rop rated movie/serie from a list
     * @param {any} list
     * @returns {any}
     */
    public getTopRated(list: any): any {
        return list.reduce((prev, current) => prev.vote_average > current.vote_average ? prev : current);
    }

    public buildImageUrl(url: string): string {
        return `https://image.tmdb.org/t/p/w500${url}`;
    }

}
