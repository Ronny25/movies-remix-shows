import {RemixBrowser, useLocation, useMatches} from "@remix-run/react";
import * as Sentry from "@sentry/remix";
import {startTransition, StrictMode, useEffect} from "react";
import {hydrateRoot} from "react-dom/client";

Sentry.init({
    dsn: 'https://d372a85f36854487b0ef6941b84c3d3a@o4504611547774976.ingest.sentry.io/4504611552493568',
    environment: window?.location?.hostname === 'localhost' ? 'development' : 'production',
    tracesSampleRate: 1,
    integrations: [
        new Sentry.BrowserTracing({
            routingInstrumentation: Sentry.remixRouterInstrumentation(
                useEffect,
                useLocation,
                useMatches
            )
        })
    ]
});

function hydrate() {
    startTransition(() => {
        hydrateRoot(
            document,
            <StrictMode>
                <RemixBrowser/>
            </StrictMode>
        );
    });
}

if (typeof requestIdleCallback === "function") {
    requestIdleCallback(hydrate);
} else {
    // Safari doesn't support requestIdleCallback
    // https://caniuse.com/requestidlecallback
    setTimeout(hydrate, 1);
}
