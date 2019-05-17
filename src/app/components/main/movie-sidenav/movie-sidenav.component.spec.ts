import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as ObservableOf, Subject } from 'rxjs';

import { MovieSidenavComponent } from './movie-sidenav.component';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { Serie } from '../shared/models/serie.model';
import { MovieService } from '../shared/movie.service';
import { FavoritesService } from '../shared/favorites.service';
import { SidenavService } from '../shared/sidenav.service';

describe('MovieSidenavComponent', () => {
    let component: MovieSidenavComponent;
    let fixture: ComponentFixture<MovieSidenavComponent>;
    let element: HTMLElement;

    let movieServiceStub: {
        getMovieById: jasmine.Spy,
        getSerieById: jasmine.Spy
    };
    let favoriteServiceStub: {
        addToFavorites: jasmine.Spy,
        removeFromFavorites: jasmine.Spy,
        isFavorite: jasmine.Spy,
    };
    let sidenavServiceStub: {
        item: any,
        item$: any,
        closeSidenav: any
    };
    const StubActivatedRoute = (params?: any) => ({
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                params: params
            }
        }
    });

    const selectors = {
        title: '#itemTitle',
        itemOverview: '#itemOverview',
        itemRuntime: '#itemRuntime',
        itemHomepage: '#itemHomepage',
        itemVote: '#itemVote',
        addFavorite: '#addFavorite',
        removeFavorite: '#removeFavorite',
        closePanel: '#closePanel'
    };

    beforeEach(() => {
        movieServiceStub = {
            getMovieById: jasmine.createSpy('getMovieById').and.returnValue(Promise.resolve(
                new Movie({
                    id: 1,
                    vote_average: 8,
                    title: 'Movie Title',
                    homepage: 'https://www.homepage.com',
                    runtime: '120',
                    overview: 'This is the movie overview'
                }))
            ),
            getSerieById: jasmine.createSpy('getSerieById').and.returnValue(Promise.resolve(new Serie({id: 2, vote_average: 7})))
        };
        favoriteServiceStub = {
            addToFavorites: jasmine.createSpy('addToFavorites'),
            removeFromFavorites: jasmine.createSpy('removeFromFavorites'),
            isFavorite: jasmine.createSpy('removeFromFavorites').and.returnValue(true)
        };
        sidenavServiceStub = {
            item: new Movie({
                id: 1,
                vote_average: 8,
                title: 'Movie Title',
                overview: 'This is the movie overview'
            }),
            item$: ObservableOf(new Subject<Movie>()),
            closeSidenav: jasmine.createSpy('closeSidenav')
        };
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MovieSidenavComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                StubActivatedRoute(),
                { provide: MovieService, useValue: movieServiceStub },
                { provide: FavoritesService, useValue: favoriteServiceStub },
                { provide: SidenavService, useValue: sidenavServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(MovieSidenavComponent);
        component = fixture.componentInstance;
        element = fixture.nativeElement;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get the item details', () => {
        expect(movieServiceStub.getMovieById).toHaveBeenCalled();
    });

    it('should display a button to close the panel', () => {
        expect(element.querySelector(selectors.closePanel)).toBeTruthy();
    });

    describe('getting the movie details', () => {
        beforeEach(() => {
            component.item = new Movie({
                id: 1,
                vote_average: 8,
                title: 'Movie Title',
                homepage: 'https://www.homepage.com',
                runtime: '120',
                overview: 'This is the movie overview'
            });
            fixture.detectChanges();
        });

        it('should build a view with the item details', () => {
            expect(element.querySelector(selectors.title)).toBeTruthy();
            expect(element.querySelector(selectors.itemOverview)).toBeTruthy();
            expect(element.querySelector(selectors.itemHomepage)).toBeTruthy();
            expect(element.querySelector(selectors.itemRuntime)).toBeTruthy();
            expect(element.querySelector(selectors.removeFavorite)).toBeTruthy();
            expect(element.querySelector(selectors.addFavorite)).toBeFalsy();
        });
    });

    describe('clicking to close the panel', () => {
        beforeEach(() => {
            component.closePanel();
        });

        it('should close the panel', () => {
            expect(sidenavServiceStub.closeSidenav).toHaveBeenCalled();
        });
    });
});
