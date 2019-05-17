// tslint:disable:member-ordering
import { Injectable } from '@angular/core';
import { Favorites } from './models/favorites.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritesService {

    private _favorites: Favorites;
    private _favoriteSubject: Subject<Favorites> = new Subject<Favorites>();
    public favorite$ = this._favoriteSubject.asObservable();

    constructor() { }

    public addToFavorites(type: string, item: any): void {
        if (type === 'movies') {
            if (!this.getFavorites().movies.some(movie => movie.id === item.id)) {
                this.getFavorites().movies.push(item);
            }
            this.setFavoritesList(this.getFavorites());
        } else {
            if (!this.getFavorites().series.some(serie => serie.id === item.id)) {
                this.getFavorites().series.push(item);
            }
            this.setFavoritesList(this.getFavorites());
        }
    }

    public removeFromFavorites(type: string, item: any): void {
        const index = type === 'movies' ? this.getFavorites().movies.findIndex(movie => movie.id === item.id)
                                       : this.getFavorites().series.findIndex(serie => serie.id === item.id);
        type === 'movies' ? this.getFavorites().movies.splice(index,1) : this.getFavorites().series.splice(index,1);
        this.setFavoritesList(this.getFavorites());
    }

    public getFavorites(): Favorites {
        if (!this._favorites) {
            const localStorageItem = localStorage.getItem('ybms-favorites');
            this._favorites = localStorageItem ? <Favorites>JSON.parse(localStorageItem) : new Favorites({});
            return this._favorites;
        } else {
            return this._favorites;
        }
    }

    public setFavoritesList(favorites: Favorites): void {
        localStorage.setItem('ybms-favorites', JSON.stringify(favorites));
        this._favoriteSubject.next(this._favorites);
    }

    public isFavorite(type: string, item: any): boolean {
        return type === 'movies' ? this.getFavorites().movies.some(movie => movie.id === item.id)
                                 : this.getFavorites().series.some(serie => serie.id === item.id);
    }
}
