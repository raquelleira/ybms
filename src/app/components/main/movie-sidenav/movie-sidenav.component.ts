import { Component, OnInit, OnDestroy } from '@angular/core';
import { SidenavService } from '../shared/sidenav.service';
import { ActivatedRoute } from '@angular/router';
import { Movie } from '../shared/models/movie.model';
import { Serie } from '../shared/models/serie.model';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { FavoritesService } from '../shared/favorites.service';
import { MovieService } from '../shared/movie.service';

@Component({
  selector: 'app-movie-sidenav',
  templateUrl: './movie-sidenav.component.html',
  styleUrls: ['./movie-sidenav.component.scss']
})
export class MovieSidenavComponent implements OnInit, OnDestroy {

    public item;
    public includeFavorite: boolean;
    private _subscriptionDestroyer: Subject<null> = new Subject();

    constructor(
        private _route: ActivatedRoute,
        private _sidenavService: SidenavService,
        private _favoriteService: FavoritesService,
        private _movieService: MovieService
    ) { }

    public ngOnInit(): void {
        if (this._sidenavService.item) {
            this.item = this._sidenavService.item.title ? new Movie(this._sidenavService.item) : new Serie (this._sidenavService.item);
            this._getItemDetails();
            this._checkFavorite();
        }
        this._startSubscriptions();
    }

    public ngOnDestroy(): void {
        this._subscriptionDestroyer.next();
        this._subscriptionDestroyer.complete();
        this.closePanel();
    }

    /**
     * Close panel
     *
     * @returns {void}
     */
    public closePanel(): void {
        this._sidenavService.closeSidenav(this._route);
    }

    public addToFavorites(item: any): void {
        const itemType = this._sidenavService.item.title  ? 'movies' : 'series';
        this._favoriteService.addToFavorites(itemType, item);
        this._checkFavorite();
    }

    public removeFavorite(item: any): void {
        const itemType = this._sidenavService.item.title  ? 'movies' : 'series';
        this._favoriteService.removeFromFavorites(itemType, item);
        this._checkFavorite();
    }

    /**
     * Subscribe to gallery service to check when a new gallery is selected.
     *
     * @returns {void}
     */
    private _startSubscriptions(): void {
        this._sidenavService.item$
            .pipe( takeUntil( this._subscriptionDestroyer ) )
            .subscribe((item) => {
                this.item = item;
                this._getItemDetails();
                this._checkFavorite();
            });
    }

    private _checkFavorite(): void {
        if (this._favoriteService.isFavorite(this._sidenavService.item.title  ? 'movies' : 'series', this.item)) {
            this.includeFavorite = false;
        } else {
            this.includeFavorite = true;
        }
    }

    private _getItemDetails(): void {
        if (this.item.title) {
            this._getMovieDetails(this.item);
        } else {
            this._getSerieDetails(this.item);
        }
    }

    private _getMovieDetails(item: any): void {
        this._movieService.getMovieById(item.id).then(movie => this.item = movie);
    }

    private _getSerieDetails(item: any): void {
        this._movieService.getSerieById(item.id).then(serie => this.item = serie);
    }

}
