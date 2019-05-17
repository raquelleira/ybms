import { Component, OnInit, Input, ViewChild, Output, EventEmitter, OnDestroy } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { FavoritesService } from '../favorites.service';
import { ActivatedRoute } from '@angular/router';
import { SidenavService } from '../sidenav.service';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {

    @Input() public listType: string;
    @Input() public list: any[];
    @Output() public refreshLists = new EventEmitter<null>();

    public listColumns: string[];
    public dataSource: MatTableDataSource<any>;
    @ViewChild(MatSort) public sort: MatSort;

    private _subscriptionDestroyer: Subject<null> = new Subject();

    constructor(
        private _favoriteService: FavoritesService,
        private _route: ActivatedRoute,
        private _sidenavService: SidenavService,
    ) { }

    /**
     * Init component view
     * @returns {void}
     */
    public ngOnInit(): void {
        const movieListColumns: string[] = ['title', 'vote_average', 'release_date'];
        const serieListColumns: string[] = ['name', 'vote_average', 'first_air_date'];
        this.dataSource = new MatTableDataSource(this.list);
        setTimeout(() => {
            this.dataSource.sort = this.sort;
        });
        if (this.listType === 'movies') {
            this.listColumns = movieListColumns;
        } else {
            this.listColumns = serieListColumns;
        }
        this._startSubscriptions();
    }

    public ngOnDestroy(): void {
        this._subscriptionDestroyer.next();
        this._subscriptionDestroyer.complete();
    }

    public addToFavorites(item: any): void {
        this._favoriteService.addToFavorites(this.listType, item);
        this.refreshLists.emit();
        this.dataSource = new MatTableDataSource(this.list);
    }

    public removeFavorite(item: any): void {
        this._favoriteService.removeFromFavorites(this.listType, item);
        this.refreshLists.emit();
        this.dataSource = new MatTableDataSource(this.list);
    }

    public openMovieDetails(item: any): void {
        this._sidenavService.item = item;
        this._sidenavService.openSidenav(this._route.parent.parent, 'movie-sidenav', 'PUSH', '400');
    }

    public checkFavorite(item: any): boolean {
        if (this._favoriteService.isFavorite(item.title  ? 'movies' : 'series', item)) {
            return true;
        } else {
            return false;
        }
    }

    /**
     * Subscribe to gallery service to check when a new gallery is selected.
     *
     * @returns {void}
     */
    private _startSubscriptions(): void {
        this._favoriteService.favorite$
            .pipe(takeUntil(this._subscriptionDestroyer))
            .subscribe(() => {
                this.refreshLists.emit();
                this.dataSource = new MatTableDataSource(this.list);
            });
    }

}
