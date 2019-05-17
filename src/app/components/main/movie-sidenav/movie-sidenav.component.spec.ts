import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MovieSidenavComponent } from './movie-sidenav.component';

describe('MovieSidenavComponent', () => {
  let component: MovieSidenavComponent;
  let fixture: ComponentFixture<MovieSidenavComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MovieSidenavComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MovieSidenavComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
