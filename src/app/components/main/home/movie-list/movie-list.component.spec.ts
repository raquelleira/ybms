import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieListComponent } from './movie-list.component';
import { Movie } from '../../shared/models/movie.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MovieService } from '../../shared/movie.service';

describe('MovieListComponent', () => {
    let component: MovieListComponent;
    let fixture: ComponentFixture<MovieListComponent>;

    let movieServiceStub: {
        getMovies: jasmine.Spy,
    };

    beforeEach(() => {
        movieServiceStub = {
            getMovies: jasmine.createSpy('getMovies').and.returnValue(Promise.resolve([
                new Movie({id: 1, vote_average: 8}),
                new Movie({id: 2, vote_average: 10})
            ]))
        };
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
        declarations: [ MovieListComponent ],
        schemas: [ NO_ERRORS_SCHEMA ],
        providers: [
            { provide: MovieService, useValue: movieServiceStub },
        ]
        })
        .compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(MovieListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get a list of movies', () => {
        expect(movieServiceStub.getMovies).toHaveBeenCalled();
        expect(component.movies.length).toBe(2);
    });
});
