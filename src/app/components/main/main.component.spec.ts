import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { of as ObservableOf, Subject } from 'rxjs';
import { MainComponent } from './main.component';
import { NO_ERRORS_SCHEMA, ChangeDetectorRef } from '@angular/core';
import { SidenavService } from './shared/sidenav.service';

describe('MainComponent', () => {
    let component: MainComponent;
    let fixture: ComponentFixture<MainComponent>;

    let sidenavServiceStub: {
        isOpened: boolean,
        sidenavMode: string,
        status$: any,
        mode$: any,
    };

    beforeEach(() => {
        sidenavServiceStub = {
            isOpened: false,
            sidenavMode: 'push',
            status$: ObservableOf(new Subject<string>()),
            mode$: ObservableOf(new Subject<string>())
        };
    });

    beforeEach(async(() => {
        TestBed.configureTestingModule({
            declarations: [ MainComponent ],
            schemas: [ NO_ERRORS_SCHEMA ],
            providers: [
                ChangeDetectorRef,
                { provide: SidenavService, useValue: sidenavServiceStub },
            ]
        })
        .compileComponents();
    }));

    beforeEach(() => {
        fixture = TestBed.createComponent(MainComponent);
        component = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('should create', () => {
        expect(component).toBeTruthy();
    });

    it('should not display the sidenav', () => {
        expect(component.sidenavOpened).toBeFalsy();
    });

    describe('when getting a request to open the sidenav', () => {
        beforeEach(() => {
            component.sidenavOpened = true;
            fixture.detectChanges();
        });

        it('should display the sidenav', () => {
            expect(component.sidenavOpened).toBeTruthy();
        });
    });
});
