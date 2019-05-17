import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MovieService } from '../shared/movie.service';
import { APP_CONFIG, APP_DI_CONFIG } from 'src/app/core/app-config.constants';
import { HttpClientModule } from '@angular/common/http';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FlexLayoutModule } from '@angular/flex-layout';
import { FavoritesService } from '../shared/favorites.service';
import { ListComponent } from './list/list.component';

@NgModule({
    declarations: [
        ListComponent
    ],
    imports: [
        CommonModule,
        FlexLayoutModule,
        HttpClientModule,
        MatTableModule,
        MatSortModule,
        MatButtonToggleModule,
        MatButtonModule,
        MatIconModule
    ],
    exports: [
        ListComponent
    ],
    providers: [
        {
            provide: APP_CONFIG,
            useValue: APP_DI_CONFIG
        },
    ]
})
export class SharedModule { }
