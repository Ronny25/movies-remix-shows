import {Link, useLoaderData} from "@remix-run/react";
import {json} from "@remix-run/node";
import React, {type ChangeEvent} from "react";

import {SearchBox} from "~/components/search-box/SearchBox";
import {MediaCard} from "~/components/media-card/MediaCard";
import {fetchPopularMovies} from "~/utils/fetchers";

import mediaCardStyles from '~/styles/media-card.css'
import searchBoxStyles from '~/styles/search-box.css'

export function links() {
    return [
        {rel: 'stylesheet', href: searchBoxStyles},
        {rel: 'stylesheet', href: mediaCardStyles},
    ]
}

export async function loader() {
    return json(await fetchPopularMovies())
}

export default function Home() {
    const popularMovies = useLoaderData<typeof loader>();

    function onChangeHandler(_event: ChangeEvent<HTMLInputElement>) {

    }

    function loadMore() {

    }

    return (
        <div className='page'>
            <SearchBox onChange={onChangeHandler}/>
            {popularMovies?.results?.length > 0 &&
                <div className='container'>
                    {/*<h1 className='home-title'>Popular Movies</h1>*/}
                    {/*<Link to='/favourites' className='toFavouritesLink'>Go to Favourites</Link>*/}
                    <div className='media-list'>
                        {popularMovies.results.map((movie, index) => (
                            <MediaCard key={movie.id} data={movie} imagePriority={index <= 2}/>
                        ))}
                    </div>
                    <div className='wrapper'>
                        <button className='load-more'
                                onClick={loadMore}
                            // disabled={state.hide}
                        >More
                        </button>
                    </div>
                </div>
            }
        </div>
    );
}
