interface MovieInterface {
    vote_average: number;
    vote_count: number;
    id: number;
    video: boolean;
    media_type: string;
    title: string;
    popularity: number;
    poster_path: string;
    original_language: string;
    original_title: string;
    genre_ids: number[];
    backdrop_path: string;
    adult: boolean;
    overview: string;
    release_date: string;
    homepage: string;
    runtime: string;
}

export class Movie implements MovieInterface {
    public vote_average: number;
    public vote_count: number;
    public id: number;
    public video: boolean;
    public media_type: string;
    public title: string;
    public popularity: number;
    public poster_path: string;
    public original_language: string;
    public original_title: string;
    public genre_ids: number[];
    public backdrop_path: string;
    public adult: boolean;
    public overview: string;
    public release_date: string;
    public homepage: string;
    public runtime: string;

    constructor({
        vote_average,
        vote_count,
        id,
        video,
        media_type,
        title,
        popularity,
        poster_path,
        original_language,
        original_title,
        genre_ids,
        backdrop_path,
        adult,
        overview,
        release_date,
        homepage,
        runtime
    }: {
        vote_average?: number;
        vote_count?: number;
        id?: number;
        video?: boolean;
        media_type?: string;
        title?: string;
        popularity?: number;
        poster_path?: string;
        original_language?: string;
        original_title?: string;
        genre_ids?: number[];
        backdrop_path?: string;
        adult?: boolean;
        overview?: string;
        release_date?: string;
        homepage?: string;
        runtime?: string;
    }) {
        this.vote_average = vote_average;
        this.vote_count = vote_count;
        this.id = id;
        this.video = video;
        this.media_type = media_type;
        this.title = title;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.original_language = original_language;
        this.original_title = original_title;
        this.genre_ids = genre_ids;
        this.backdrop_path = backdrop_path;
        this.adult = adult;
        this.overview = overview;
        this.release_date = release_date;
        this.homepage = homepage;
        this.runtime = runtime;
    }
}

