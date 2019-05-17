import { AppAPIConfig } from './api/app-api-params.model';

export interface AppConfig {
    API_KEY: string;
    MOVIE_LIST_ID: string;
    SERIE_LIST_ID: string;
    API: AppAPIConfig;
    IMAGE_URL: string;
}
