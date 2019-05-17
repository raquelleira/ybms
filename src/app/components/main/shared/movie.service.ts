import { Injectable, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';

import { APP_CONFIG } from 'src/app/core/app-config.constants';
import { AppConfig } from 'src/app/core/app-config.interface';
import { Movie } from './models/movie.model';
import { Serie } from './models/serie.model';

@Injectable({
  providedIn: 'root'
})

export class MovieService {

    private _movies: Movie[] = null;
    private _pendingMoviePromise: Promise<Movie[]> | null;

    private _series: Serie[] = null;
    private _pendingSeriePromise: Promise<Serie[]> | null;

    constructor(
        @Inject(APP_CONFIG) private _config: AppConfig,
        private _httpClient: HttpClient
    ) { }

    /**
     * Gets the movies list
     * As the list won't change, once it's retrieved, we'll not do API calls to get the list again.
     * We'll use the cached list instead.
     * Use `forceFetch = true` if a refreshed list is needed.
     *
     * @param {boolean = false} forceFetch
     * @returns {Promise<Movie[]>}
     */
    public getMovies(forceFetch: boolean = false): Promise<Movie[]> {
        if (this._movies && !forceFetch) {
            return Promise.resolve(this._movies);
        } else if (this._pendingMoviePromise && !forceFetch) {
            return this._pendingMoviePromise;
        } else {
            const url: string = this._config.API.MOVIE.GET_ALL({
                listId: this._config.MOVIE_LIST_ID,
                apiKey: this._config.API_KEY
            });
            this._pendingMoviePromise = this._httpClient.get<Movie[]>( url )
                .pipe<Movie[]>(
                    map((response: any) => {
                        return response.items || null;
                    })
                )
                .toPromise()
                .then((movies: Movie[]) => {
                    this._movies = movies;
                    this._pendingMoviePromise = null;
                    return this._movies;
                })
                .catch((error) => {
                    console.error(error);
                    this._pendingMoviePromise = null;
                }) as Promise<any>;
                return this._pendingMoviePromise;
        }
    }

    /**
     * Gets the series list
     * As the list won't change, once it's retrieved, we'll not do API calls to get the list again.
     * We'll use the cached list instead.
     * Use `forceFetch = true` if a refreshed list is needed.
     *
     * @param {boolean = false} forceFetch
     * @returns {Promise<Serie[]>}
     */
    public getSeries(forceFetch: boolean = false): Promise<Serie[]> {
        if (this._series && !forceFetch) {
            return Promise.resolve(this._series);
        } else if (this._pendingSeriePromise && !forceFetch) {
            return this._pendingSeriePromise;
        } else {
            const url: string = this._config.API.SERIE.GET_ALL({
                listId: this._config.SERIE_LIST_ID,
                apiKey: this._config.API_KEY
            });
            this._pendingSeriePromise = this._httpClient.get<Serie[]>( url )
                .pipe<Serie[]>(
                    map((response: any) => {
                        return response.items || null;
                    })
                )
                .toPromise()
                .then((series: Serie[]) => {
                    this._series = series;
                    this._pendingSeriePromise = null;
                    return this._series;
                })
                .catch((error) => {
                    console.error(error);
                    this._pendingSeriePromise = null;
                }) as Promise<any>;
                return this._pendingSeriePromise;
        }
    }

    public getMovieById(id: number): Promise<Movie> {
        const url: string = this._config.API.MOVIE.GET({
            movieId: id,
            apiKey: this._config.API_KEY
        });
        return this._httpClient.get<Movie>(url).toPromise();
    }

    public getSerieById(id: number): Promise<Serie> {
        const url: string = this._config.API.SERIE.GET({
            serieId: id,
            apiKey: this._config.API_KEY
        });
        return this._httpClient.get<Serie>(url).toPromise();
    }
}
