import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Movie } from '../shared/models/movie.model';
import { Serie } from '../shared/models/serie.model';
import { MovieService } from '../shared/movie.service';

describe('HomeComponent', () => {
    let component: HomeComponent;
    let fixture: ComponentFixture<HomeComponent>;

    let movieServiceStub: {
        getMovies: jasmine.Spy,
        getSeries: jasmine.Spy,
        getMovieById: jasmine.Spy,
        getSerieById: jasmine.Spy,
    };

    beforeEach(() => {
        movieServiceStub = {
            getMovies: jasmine.createSpy('getMovies').and.returnValue(Promise.resolve([new Movie({id: 1, vote_average: 8})])),
            getSeries: jasmine.createSpy('getSeries').and.returnValue(Promise.resolve([new Serie({id: 2, vote_average: 7})])),
            getMovieById: jasmine.createSpy('getMovieById').and.returnValue(Promise.resolve(new Movie({id: 1, vote_average: 8}))),
            getSerieById: jasmine.createSpy('getSerieById').and.returnValue(Promise.resolve(new Serie({id: 2, vote_average: 7})))
        };
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ HomeComponent ],
            schemas: [NO_ERRORS_SCHEMA],
            providers: [
                { provide: MovieService, useValue: movieServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(HomeComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should display the movie list', () => {
        expect(component.isMovieList).toBeTruthy();
    });

    describe('toggling to series view', () => {
        beforeEach(() => {
            component.toogleList();
            fixture.detectChanges();
        });

        it('should display the series list', () => {
            expect(component.isMovieList).toBeFalsy();
        });

        describe('then toggling to movies view again', () => {
            beforeEach(() => {
                component.toogleList();
                fixture.detectChanges();
            });

            it('should display the moviews list', () => {
                expect(component.isMovieList).toBeTruthy();
            });
        });
    });
});
