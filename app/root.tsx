import {json, type MetaFunction} from "@remix-run/node";
import {
    Links,
    LiveReload,
    Meta,
    Outlet,
    Scripts,
    ScrollRestoration, useLoaderData,
} from "@remix-run/react";
import {withSentry} from "@sentry/remix";

import {ConfigurationContext, GenresContext} from "~/context/GenresContext";
import {useNonce} from "~/context/nonce";

import {fetchConfiguration, fetchMovieGenres} from "~/utils/fetchers";

import styles from '~/styles/global.css';

export const meta: MetaFunction = () => ({
    charset: "utf-8",
    title: "Remix Movies",
    viewport: "width=device-width,initial-scale=1",
});

export function links() {
    return [{rel: 'stylesheet', href: styles}];
}

export async function loader() {
    const [genresRes, configuration] = await Promise.all([
        fetchMovieGenres(),
        fetchConfiguration()
    ]);

    return json({
        genres: genresRes?.genres ?? [],
        configuration
    });
}

function Root() {
    const nonce = useNonce();
    const {genres, configuration} = useLoaderData<typeof loader>();

    return (
        <html lang="en">
        <head>
            <Meta/>
            <Links/>
        </head>
        <body>

        <ConfigurationContext.Provider value={configuration}>
            <GenresContext.Provider value={genres}>
                <Outlet/>
            </GenresContext.Provider>
        </ConfigurationContext.Provider>

        <ScrollRestoration nonce={nonce}/>
        <Scripts nonce={nonce}/>
        <LiveReload nonce={nonce}/>

        </body>
        </html>
    );
}

export default withSentry(Root);
