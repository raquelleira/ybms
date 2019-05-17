import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { homeRouting } from './home.routing';
import { HomeComponent } from './home.component';
import { MovieService } from '../shared/movie.service';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/core/app-config.constants';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MovieListComponent } from './movie-list/movie-list.component';
import { SerieListComponent } from './serie-list/serie-list.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { SharedModule } from '../shared/shared.module';

@NgModule({
    declarations: [HomeComponent, MovieListComponent, SerieListComponent],
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        MatTableModule,
        MatSortModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatIconModule,
        SharedModule,
        homeRouting
    ],
    providers: [
        MovieService,
        {
            provide: APP_CONFIG,
            useValue: APP_DI_CONFIG
        },
    ]
})
export class HomeModule { }
