import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    MatBadgeModule,
    MatMenuModule,
    MatButtonToggleModule,
    MatTabsModule
} from '@angular/material';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MainComponent } from './main.component';
import { navigationRouting } from './main.routing';
import { MovieService } from './shared/movie.service';
import { FavoritesComponent } from './favorites/favorites.component';
import { SharedModule } from './shared/shared.module';
import { SidenavService } from './shared/sidenav.service';
import { MovieSidenavComponent } from './movie-sidenav/movie-sidenav.component';
import { AboutComponent } from './about/about.component';

@NgModule({
    declarations: [
        MainComponent,
        FavoritesComponent,
        MovieSidenavComponent,
        AboutComponent
    ],
    imports: [
        CommonModule,
        navigationRouting,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatListModule,
        MatBadgeModule,
        MatMenuModule,
        MatButtonToggleModule,
        MatTabsModule,
        FlexLayoutModule,
        SharedModule
    ],
    providers: [
        SidenavService,
        MovieService
    ]
})
export class MainModule { }
