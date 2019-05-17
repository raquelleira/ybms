import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as ObservableOf, Subject } from 'rxjs';
import { ListComponent } from './list.component';
import { ActivatedRoute } from '@angular/router';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { Movie } from '../models/movie.model';
import { FavoritesService } from '../favorites.service';
import { SidenavService } from '../sidenav.service';
import { MatTableModule } from '@angular/material';

describe('ListComponent', () => {
    let component: ListComponent;
    let fixture: ComponentFixture<ListComponent>;

    let sidenavServiceStub: {
        item: any,
        item$: any,
        openSideNav: any
    };

    let favoriteServiceStub: {
        addToFavorites: jasmine.Spy,
        removeFromFavorites: jasmine.Spy,
        isFavorite: jasmine.Spy,
        favorite$: any
    };

    beforeEach(() => {
        favoriteServiceStub = {
            addToFavorites: jasmine.createSpy('addToFavorites'),
            removeFromFavorites: jasmine.createSpy('removeFromFavorites'),
            isFavorite: jasmine.createSpy('removeFromFavorites').and.returnValue(true),
            favorite$: ObservableOf(new Subject<Movie>()),
        };
        sidenavServiceStub = {
            item: new Movie({
                id: 1,
                vote_average: 8,
                title: 'Movie Title',
                overview: 'This is the movie overview'
            }),
            item$: ObservableOf(new Subject<Movie>()),
            openSideNav: jasmine.createSpy('openSideNav')
        };
    });

    const StubActivatedRoute = (params?: any) => ({
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                params: params
            }
        }
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            imports: [
                MatTableModule
            ],
            declarations: [ ListComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                StubActivatedRoute(),
                { provide: FavoritesService, useValue: favoriteServiceStub },
                { provide: SidenavService, useValue: sidenavServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(ListComponent);
        component = fixture.componentInstance;
        component.listType = 'movies';
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });
});
