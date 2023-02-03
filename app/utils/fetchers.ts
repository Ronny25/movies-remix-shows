import type {Genre, MovieDetails, MovieRecommendations, MovieSimilar} from "~/types/movie";
import type {PopularMovies} from "~/types/popular";
import type {MovieSearchDetails} from "~/types/search";

import {
    createPopularUrl,
    createMovieDetailsUrl,
    createMovieSearchUrl,
    createMovieGenresUrl,
    createApiUrl
} from "./urls";

const fetcher = async <T extends any>(url: string | URL, init?: RequestInit): Promise<T> => await (await fetch(url, init)).json();

export const fetchConfiguration = () => fetcher<any>(createApiUrl('/configuration'));

export const fetchPopularMovies = (page = 1) => fetcher<PopularMovies>(createPopularUrl(page));

export const fetchMovieSearch = (query: string): Promise<MovieSearchDetails> => query
    ? fetcher<MovieSearchDetails>(createMovieSearchUrl({query, page: 1}))
    : Promise.resolve({} as MovieSearchDetails);

export const fetchMovieDetails = (id: string | number) => fetcher<MovieDetails>(createMovieDetailsUrl(id));
export const fetchMovieRecommendations = (id: string | number) => fetcher<MovieRecommendations>(createMovieDetailsUrl(id, '/recommendations'));
export const fetchMovieSimilar = (id: string | number) => fetcher<MovieSimilar>(createMovieDetailsUrl(id, '/similar'));
export const fetchMovieGenres = () => fetcher<{ genres: Genre[] }>(createMovieGenresUrl());
