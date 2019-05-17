import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SerieListComponent } from './serie-list.component';
import { Serie } from '../../shared/models/serie.model';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { MovieService } from '../../shared/movie.service';

describe('SerieListComponent', () => {
    let component: SerieListComponent;
    let fixture: ComponentFixture<SerieListComponent>;

    let movieServiceStub: {
        getSeries: jasmine.Spy,
    };

    beforeEach(() => {
        movieServiceStub = {
            getSeries: jasmine.createSpy('getSeries').and.returnValue(Promise.resolve([
                new Serie({id: 1, vote_average: 8}),
                new Serie({id: 2, vote_average: 10}),
                new Serie({id: 3, vote_average: 5})
            ]))
        };
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ SerieListComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                { provide: MovieService, useValue: movieServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(async(() => {
        fixture = TestBed.createComponent(SerieListComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    }));

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should get a list of series', () => {
        expect(movieServiceStub.getSeries).toHaveBeenCalled();
        expect(component.series.length).toBe(3);
    });
});
