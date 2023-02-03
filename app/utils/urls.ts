export const createApiUrl = (apiURL: string, searchParams?: Record<string, string | number | boolean>) => {
    const baseUrl = new URL(process.env.MOVIE_DB_API_URL ?? '');
    const url = new URL(`/3${apiURL}`, baseUrl);
    
    url.searchParams.append('api_key', process.env.MOVIE_DB_API_KEY ?? '');
    url.searchParams.append('language', 'en-US');

    if (searchParams) {
        for (const key in searchParams) {
            if (Object.prototype.hasOwnProperty.call(searchParams, key)) {
                const param = searchParams[key];
                url.searchParams.append(key, param as string);
            }
        }
    }

    return url;
}

export const createPopularUrl = (page: number) => createApiUrl('/movie/popular', { page });

export const createMovieSearchUrl = ({page, query}: {page: number; query: string; } = {page: 1, query: ''}) => createApiUrl('/search/movie', { query, page, include_adult: false });

export const createMovieDetailsUrl = (id: string | number, addon = '') => createApiUrl(`/movie/${id}${addon}`);

export const createMovieGenresUrl = () => createApiUrl('/genre/movie/list');