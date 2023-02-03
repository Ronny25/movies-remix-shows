import {redirect} from "@remix-run/node";

import {fetchMovieDetails, fetchMovieRecommendations, fetchMovieSimilar} from "~/utils/fetchers";
import {replaceAllNonWords} from "~/utils/strings";

export async function loadMediaDetails(mediaId: string) {
    const matchedParams = mediaId?.match(/^(\d+)(?:-(.+))?/i);
    if (!mediaId || !matchedParams) {
        throw redirect('/');
    }

    const [, id, title] = matchedParams;
    const movieDetails = await fetchMovieDetails(id);

    const escapedTitle = replaceAllNonWords(movieDetails.title);
    if (escapedTitle !== title) {
        throw redirect(`/movie/${id}-${escapedTitle}`, 301);
    }

    return movieDetails;
}

export async function loadMediaPageAddons(mediaId: string) {
    if (!mediaId) {
        return [];
    }

    return Promise.all([
        fetchMovieSimilar(mediaId),
        fetchMovieRecommendations(mediaId)
    ])
}
