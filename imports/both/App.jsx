import React from "react";
import {ApolloProvider} from "@apollo/client";
import {HelmetProvider} from "react-helmet-async";
import Routes from "./../ui/Routes";
import Router from "./Router";

export default function App({client, location, context = {}, host}) {
    return (
        <ApolloProvider client={client}>
            <HelmetProvider context={context}>
                <Router location={location}>
                    <Routes host={host}/>
                </Router>
            </HelmetProvider>
        </ApolloProvider>
    );
}
