import type { Pagination } from "./pagination";

export interface MovieDetails {
    adult:                 boolean;
    backdrop_path:         string;
    belongs_to_collection: BelongsToCollection;
    budget:                number;
    genres:                Genre[];
    homepage:              string;
    id:                    number;
    imdb_id:               string;
    original_language:     string;
    original_title:        string;
    overview:              string;
    popularity:            number;
    poster_path:           null | string;
    production_companies:  ProductionCompany[];
    production_countries:  ProductionCountry[];
    release_date:          string;
    revenue:               number;
    runtime:               number;
    spoken_languages:      SpokenLanguage[];
    status:                string;
    tagline:               string;
    title:                 string;
    video:                 boolean;
    vote_average:          number;
    vote_count:            number;
}

export interface BelongsToCollection {
    id:            number;
    name:          string;
    poster_path:   string;
    backdrop_path: string;
}

export interface Genre {
    id:   number;
    name: string;
}

export interface ProductionCompany {
    id:             number;
    logo_path:      string;
    name:           string;
    origin_country: string;
}

export interface ProductionCountry {
    iso_3166_1: string;
    name:       string;
}

export interface SpokenLanguage {
    english_name: string;
    iso_639_1:    string;
    name:         string;
}

export type MovieRecommendations = Pagination<MovieRecommendationResult>;

export interface MovieRecommendationResult {
    adult:             boolean;
    backdrop_path:     null | string;
    id:                number;
    title:             string;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    poster_path:       null | string;
    media_type:        MediaType;
    genre_ids:         number[];
    popularity:        number;
    release_date:      string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}

export type MediaType = 'movie' | 'tv';

export enum OriginalLanguage {
    En = 'en',
    Ja = "ja",
    Ko = "ko",
}

export type MovieSimilar = Pagination<MovieSimilarResult>;

export interface MovieSimilarResult {
    adult:             boolean;
    backdrop_path:     null | string;
    genre_ids:         number[];
    id:                number;
    original_language: OriginalLanguage;
    original_title:    string;
    overview:          string;
    popularity:        number;
    poster_path:       null | string;
    release_date:      string;
    title:             string;
    video:             boolean;
    vote_average:      number;
    vote_count:        number;
}
