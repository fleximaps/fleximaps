import {clean} from 'require-clean';
import express from 'express';
import graphQLHTTP from 'express-graphql';

const GRAPHQL_PORT = 8080;

function startGraphQLServer(callback) {
    // Expose a GraphQL endpoint
    clean('./schema');
    const {Schema} = require('./schema');
    const graphQLApp = express();
    graphQLApp.use('/', graphQLHTTP({
        graphiql: true,
        pretty: true,
        schema: Schema
    }));

    graphQLApp.listen(GRAPHQL_PORT, () => {
        console.log(
            `GraphQL server is now running on http://localhost:${GRAPHQL_PORT}`
        );
        if (callback) {
            callback();
        }
    });
}

startGraphQLServer();