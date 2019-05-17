interface SerieInterface {
    original_name: string;
    id: number;
    media_type: string;
    name: string;
    vote_count: number;
    vote_average: number;
    poster_path: string;
    first_air_date: number;
    popularity: number;
    genre_ids: number[];
    original_language: string;
    backdrop_path: string;
    overview: string;
    origin_country: string[];
    homepage: string;
}

export class Serie implements SerieInterface {
    public original_name: string;
    public id: number;
    public media_type: string;
    public name: string;
    public vote_count: number;
    public vote_average: number;
    public poster_path: string;
    public first_air_date: number;
    public popularity: number;
    public genre_ids: number[];
    public original_language: string;
    public backdrop_path: string;
    public overview: string;
    public origin_country: string[];
    public homepage: string;

    constructor ({
        original_name,
        id,
        media_type,
        name,
        vote_count,
        vote_average,
        poster_path,
        first_air_date,
        popularity,
        genre_ids,
        original_language,
        backdrop_path,
        overview,
        origin_country,
        homepage
    }: {
        original_name?: string;
        id?: number;
        media_type?: string;
        name?: string;
        vote_count?: number;
        vote_average?: number;
        poster_path?: string;
        first_air_date?: number;
        popularity?: number;
        genre_ids?: number[];
        original_language?: string;
        backdrop_path?: string;
        overview?: string;
        origin_country?: string[];
        homepage?: string;
    }) {
        this.original_name = original_name;
        this.id = id;
        this.media_type = media_type;
        this.name = name;
        this.vote_count = vote_count;
        this.vote_average = vote_average;
        this.poster_path = poster_path;
        this.first_air_date = first_air_date;
        this.popularity = popularity;
        this.genre_ids = genre_ids;
        this.original_language = original_language;
        this.backdrop_path = backdrop_path;
        this.overview = overview;
        this.origin_country = origin_country;
        this.homepage = homepage;
    }
}
