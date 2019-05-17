import { Movie } from './movie.model';
import { Serie } from './serie.model';

interface FavoritesInterface {
    movies: Movie[];
    series: Serie[];
}

export class Favorites implements FavoritesInterface {
    public movies: Movie[];
    public series: Serie[];

    constructor({
        movies = [],
        series = []
    }: {
        movies?: Movie[];
        series?: Serie[];
    }) {
        this.movies = movies;
        this.series = series;
    }
}
