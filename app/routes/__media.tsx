import {Link, Outlet} from "@remix-run/react";

import styles from '~/styles/media-page.css'
import mediaCardStyles from '~/styles/media-card.css'

export function links() {
    return [
        {rel: 'stylesheet', href: styles},
        {rel: 'stylesheet', href: mediaCardStyles},
    ]
}

export default function Media() {
    return (
        <div className='media-page'>
            <Link to='/' className='backToMainLink'>Search for new movie</Link>
            <Link to='/favourites' className='toFavouritesLink'>Go to Favourites</Link>
            <Outlet/>
        </div>
    );
}