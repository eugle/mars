import {ApolloServer} from "apollo-server-express";
import {WebApp} from "meteor/webapp";
import {getUser} from "meteor/apollo";
import typeDefs from "/imports/apollo/schema.graphql";

const resolvers = {
    Query: {
        getBasic: async (_, {}, {host, lang}) => {
            const defaultData = {
                "a.com": {host: 'a.com', lang: 'en', title: 'a.com', content: 'This is a.com data'},
                "b.com": {host: 'b.com', lang: 'en', title: 'b.com', content: 'This is b.com data'},
                "none": {host: 'none', lang: 'en', title: 'none', content: 'No data available'}
            }

            const startTime = new Date();

            function needWait() {
                return new Promise(resolve => {
                    setTimeout(() => {
                        console.log("Pretend that this is an asynchronous program");
                        resolve();
                    }, 5000)
                })
            }

            async function test() {
                await needWait();
                console.log("I should have been printed first");
            }

            await test();

            console.log(new Date - startTime / 1000, 'seconds');

            return defaultData[host || 'none'];
        }
    },
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: async ({req}) => {
        return {
            host: await req.headers['client-host'],
            lang: await req.headers['client-lang'],
            user: await getUser(req.headers.authorization),
        }
    },
});

server.applyMiddleware({
    app: WebApp.connectHandlers,
    cors: true,
});
