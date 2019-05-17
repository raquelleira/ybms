// tslint:disable:no-angle-bracket-type-assertion
import { AppAPIConfig } from './app-api-params.model';
import { AppAPIResource } from './app-api-resource.model';

export const apiConfig: AppAPIConfig  = {
    MOVIE: <AppAPIResource> {
        GET: (params: any) => `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${params.apiKey}&language=en-US`,
        GET_ALL: (params: any) => `https://api.themoviedb.org/3/list/${params.listId}?api_key=${params.apiKey}&language=en-US`,
    },
    SERIE: <AppAPIResource> {
        GET: (params: any) => `https://api.themoviedb.org/3/tv/${params.serieId}?api_key=${params.apiKey}&language=en-US`,
        GET_ALL: (params: any) => `https://api.themoviedb.org/3/list/${params.listId}?api_key=${params.apiKey}&language=en-US`,
    }
};
