import {onPageLoad} from "meteor/server-render";
import React from "react";
import {renderToString} from "react-dom/server";
import {getMarkupFromTree} from "@apollo/client/react/ssr";
import App from "../imports/both/App";
import initClient from "/imports/both/client";
import {ServerStyleSheet} from "styled-components";
import {patchUserByToken, restoreUser, cookie} from './account';

function getClientData(client) {
    const cache = JSON.stringify(client.cache.extract());
    return `<script>window.__APOLLO_STATE__=${cache.replace(
        /</g,
        "\\u003c"
    )}</script>`;
}

onPageLoad(async (sink) => {
    const token = cookie.get('token', sink.request.headers.cookie) || sink.request.url.query.token;
    const sheet = new ServerStyleSheet();
    const client = await initClient(sink, token);
    const helmetContext = {};
    const host = sink.request.headers.host?.split(':')?.[0];
    const tree = sheet.collectStyles(
        <App client={client} location={sink.request.url} context={helmetContext} host={host}/>
    );

    return getMarkupFromTree({
        tree,
        context: {},
        renderFunction: renderToString,
    }).then((html) => {
        const style = sheet.getStyleTags();
        sheet.seal();

        const {helmet} = helmetContext;
        const clientData = getClientData(client);
        sink.appendToHead(style);
        sink.appendToHead(helmet.meta.toString());
        sink.appendToHead(helmet.title.toString());
        sink.appendToHead(clientData);
        sink.renderIntoElementById("app", html);
    });
});
