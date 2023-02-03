import type {EntryContext} from "@remix-run/node";
import {RemixServer} from "@remix-run/react";
import {renderToString} from "react-dom/server";
import crypto from 'node:crypto';
import {NonceContext} from "~/context/nonce";

export default function handleRequest(
    request: Request,
    responseStatusCode: number,
    responseHeaders: Headers,
    remixContext: EntryContext
) {
    const cspNonce = crypto.randomBytes(16).toString('hex');

    const markup = renderToString(
        <NonceContext.Provider value={cspNonce}>
            <RemixServer context={remixContext} url={request.url}/>
        </NonceContext.Provider>
    );

    const cspString = `
    script-src 'unsafe-inline' https: 'nonce-${cspNonce}' 'strict-dynamic' vitals.vercel-insights.com;
    object-src 'none'; base-uri 'none';
    img-src https://assets.vercel.com https://image.tmdb.org;
    `.replace(/\n/g, '').replace(/\s\s+/g, ' ');

    responseHeaders.set("Content-Type", "text/html");
    responseHeaders.set("Content-Security-Policy", cspString);

    return new Response("<!DOCTYPE html>" + markup, {
        headers: responseHeaders,
        status: responseStatusCode,
    });
}
