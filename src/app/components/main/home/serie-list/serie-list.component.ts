import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';

import { Serie } from '../../shared/models/serie.model';
import { MovieService } from '../../shared/movie.service';
import { FavoritesService } from '../../shared/favorites.service';

@Component({
  selector: 'app-serie-list',
  templateUrl: './serie-list.component.html',
  styleUrls: ['./serie-list.component.scss']
})
export class SerieListComponent implements OnInit {

    public series: Serie[];

    constructor(
        private _movieService: MovieService
    ) { }

    /**
     * Init component view
     * @returns {void}
     */
    public ngOnInit(): void {
        this._getSeriesList();
    }

    /**
     * Gets the series list and populates a data source
     * @returns {void}
     */
    private _getSeriesList(): void {
        this._movieService.getSeries().then(series => this.series = series);
    }

}
