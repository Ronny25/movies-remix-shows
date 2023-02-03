import {json, type LoaderArgs} from "@remix-run/node";
import {useLoaderData} from "@remix-run/react";
import type {MovieRecommendations, MovieSimilar} from "~/types/movie";
import {loadMediaDetails, loadMediaPageAddons} from "~/shared/media/loaders";
import {MediaCard} from "~/components/media-card/MediaCard";
import {getBaseImgPath} from "~/utils/images";

export async function loader({params}: LoaderArgs) {
    const movieDetails = await loadMediaDetails(params.movieId ?? '');

    const [similarMovies, recommendationsMovies] = await loadMediaPageAddons(params.movieId ?? '');

    return json({
        movieDetails,
        similarMovies,
        recommendationsMovies,
    });
}

export default function Movie() {
    const {movieDetails, similarMovies, recommendationsMovies} = useLoaderData<typeof loader>();

    const state: any = {};

    function onStarClick() {

    }

    function renderAdditions(data: MovieRecommendations | MovieSimilar, title: 'Recommendations' | 'Similar') {
        if (!data.results?.length) {
            return null;
        }

        return (
            <>
                <h2 className='media-header'>{title}</h2>
                <div className='media-list media-list__expanded'>
                    {data.results.map((item, index) => {
                        if (index >= 4) {
                            return true;
                        }

                        return <MediaCard key={item.id} data={item}/>;
                    })}
                </div>
            </>
        )
    }

    return (
        <div className='media-content'>
            <div className='media-content__poster'>
                {movieDetails.poster_path
                    ? (
                        <picture>
                            <source
                                srcSet={getBaseImgPath(`/w780${movieDetails.poster_path}`)}
                                media="(min-width: 900px)"
                            />
                            <source
                                srcSet={getBaseImgPath(`/w500${movieDetails.poster_path}`)}
                                media="(min-width: 500px)"
                            />
                            <img
                                src={getBaseImgPath(`/w342${movieDetails.poster_path}`)}
                                alt={`${movieDetails.title} poster`}
                                loading="eager"
                                // @ts-ignore
                                fetchpriority="high"
                            />
                        </picture>
                    )
                    : (
                        <div className="media-no-image media-no-image__main">
                            <span className="media-no-image-text">no image found</span>
                        </div>
                    )
                }
            </div>
            <h1 className='media-content__title'>{movieDetails.title}</h1>
            <h2 className='media-content__tagline'>{movieDetails.tagline}</h2>
            <div className='media-content__ratings'>
                <span
                    className={
                        state[movieDetails.id] ?
                            'media-content__star added' :
                            'media-content__star'
                    }
                    onClick={onStarClick}
                >☆</span>
                <span className='media-content__grade'>{movieDetails.vote_average}</span>
            </div>
            <h6 className='media-content__genres'><span>Genres: </span>
                {movieDetails.genres.map((genre, index) => <p key={index}>{genre.name}</p>)}
            </h6>
            <h6 className='media-content__budget'>Budget: ${movieDetails.budget}</h6>
            <h6 className='media-content__revenue'>Revenue: ${movieDetails.revenue}</h6>
            <p className='media-content__description'>{movieDetails.overview}</p>
            <p className='media-content__homeLink'>Homepage:
                <a href={movieDetails.homepage} target='_blanc'>{movieDetails.homepage}</a>
            </p>
            {renderAdditions(recommendationsMovies, 'Recommendations')}
            {renderAdditions(similarMovies, 'Similar')}
        </div>
    );
}
