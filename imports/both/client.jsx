import {Meteor} from "meteor/meteor";
import {ApolloClient, InMemoryCache, ApolloLink, HttpLink} from "@apollo/client";
import {MeteorAccountsLink} from "meteor/apollo";
import {Accounts} from "meteor/accounts-base";
import fetch from "cross-fetch";

const cache = Meteor.isClient
    ? new InMemoryCache().restore(window.__APOLLO_STATE__)
    : new InMemoryCache();

const initClient = async (sink, token) => {
    const host = await sink?.request?.headers?.host?.split(':')?.[0];
    const lang = await sink?.request?.headers?.pathname?.split('/')?.[1];

    const httpLink = new HttpLink({
        uri: Meteor.absoluteUrl('/graphql'),
        headers: {
            authorization: Meteor.isClient ? Accounts._storedLoginToken() : token,
            'client-host': Meteor.isServer ? host : window.location.hostname,
            'client-lang': Meteor.isServer ? lang : window.location.pathname?.split('/')?.[1]
        },
        fetch
    });

    const apolloLink = Meteor.isClient
        ? ApolloLink.from([new MeteorAccountsLink(), httpLink])
        : httpLink

    return new ApolloClient({
        ssrMode: Meteor.isServer,
        link: apolloLink,
        cache,
        ssrForceFetchDelay: 0,
        // defaultOptions: {
        //     watchQuery: {
        //         fetchPolicy: 'cache-and-network'
        //     },
        // },
    })

}

export default initClient;
