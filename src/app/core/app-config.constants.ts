import { AppConfig } from './app-config.interface';
import { apiConfig } from './api/api-config.constants';
import { InjectionToken } from '@angular/core';

export const APP_DI_CONFIG: AppConfig = {
    API_KEY: '5d8bf2990a40ee592eee0bd672676d61',
    MOVIE_LIST_ID: '111862',
    SERIE_LIST_ID: '111866',
    API: apiConfig,
    IMAGE_URL: 'https://image.tmdb.org/t/p/w500'
};

export let APP_CONFIG = new InjectionToken<AppConfig>('app.config');

