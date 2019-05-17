import { Component, OnInit } from '@angular/core';
import { FavoritesService } from '../shared/favorites.service';
import { Favorites } from '../shared/models/favorites.model';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

    public favorites: Favorites;
    public isMovieList: boolean = true;

    constructor(
        private _favoritesService: FavoritesService,
    ) { }

    public ngOnInit(): void {
        this._getFavorites();
    }

    /**
     * Switches lists
     * @returns {void}
     */
    public toogleList(): void {
        this.isMovieList = !this.isMovieList;
    }

    public refreshLists(): void {
        this._getFavorites();
    }

    private _getFavorites(): void {
        this.favorites = this._favoritesService.getFavorites();
    }
}
