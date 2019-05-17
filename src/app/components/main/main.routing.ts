import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
import { FavoritesComponent } from './favorites/favorites.component';
import { MovieSidenavComponent } from './movie-sidenav/movie-sidenav.component';
import { AboutComponent } from './about/about.component';

const mainRoutes: Routes = [
    {
        path: 'main',
        component: MainComponent,
        children: [
            {
                path: 'home',
                loadChildren: './home/home.module#HomeModule'
            },
            {
                path: 'favorites',
                component: FavoritesComponent
            },
            {
                path: 'about',
                component: AboutComponent
            },
            {
                path: 'movie-sidenav',
                component: MovieSidenavComponent,
                outlet: 'right'
            }
        ]
    },
    {
        path: '',
        redirectTo: 'main/home'
    },
];

export const navigationRouting: ModuleWithProviders = RouterModule.forChild(mainRoutes);
