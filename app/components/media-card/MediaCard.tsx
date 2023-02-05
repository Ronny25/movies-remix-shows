import {Link} from "@remix-run/react";
import {useGenres} from "~/context/GenresContext";
import {replaceAllNonWords} from "~/utils/strings";
import {getBaseImgPath} from "~/utils/images";

type Props = {
    data: Record<string, any>;
    imagePriority?: boolean;
    favourites?: boolean;
    index?: number;
    favFunc?: any;
}

export function MediaCard({data, imagePriority = false, favourites, index, favFunc}: Props) {
    const state: any = {};
    const allGenres = useGenres();

    const imageProps = imagePriority
        ? { loading: 'eager', fetchpriority: "high" }
        : { loading: 'lazy', decoding: 'async' };

    function checkGenres() {
        const genresToIterate: (string | number)[] = data.genre_ids ? data.genre_ids : data.genres;
        return (
            <p>
                {
                    genresToIterate
                        .map((genreId) => {
                            const foundGenre = allGenres.find((genre) => genre.id === genreId);
                            if (foundGenre) {
                                return foundGenre.name;
                            }
                            return null;
                        })
                        .filter(Boolean)
                        .join(', ')
                }
            </p>
        );
    }

    function onStarClick() {
        return null;
    }

    return (
        <div className='media-card'>
            <div className='media-poster'>
                {data.poster_path
                    ? (
                        <img
                            srcSet={`${getBaseImgPath(`/w780${data.poster_path}`)} 2x`}
                            src={getBaseImgPath(`/w300${data.poster_path}`)}
                            alt={`${data.title} poster`}
                            // height={278}
                            // width={185}
                            {...(imageProps as any)}
                        />
                    )
                    : (
                        <div className="media-no-image">
                            <span className="media-no-image-text">no image found</span>
                        </div>
                    )
                }
            </div>
            <div className='media-info'>
                <h3 className='media-info__title'>{data.title}</h3>
                <h6 className='media-info__genres'>
                    {checkGenres()}
                </h6>
                {!!data.vote_average &&
                    <div className='media-info__ratings'>
                        <span
                            className={
                                (state[data.id] !== null && state[data.id]) ||
                                favourites ?
                                    'media-info__star added' :
                                    'media-info__star'
                            }
                            onClick={favourites ? favFunc(index) : onStarClick}
                        >☆</span>
                        <span className='media-info__grade'>{data.vote_average}</span>
                    </div>
                }
                <p className='media-info__description'>{data.overview}</p>
                <Link
                    to={`/movie/${data.id}-${replaceAllNonWords(data.title)}`}
                    className='media-details'
                >
                    Show more
                </Link>
            </div>
        </div>
    )
}