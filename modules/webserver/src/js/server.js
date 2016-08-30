import path from 'path';
import express from 'express';
import proxy from 'express-http-proxy';

const APP_PORT = 3000;
const GRAPHQL_PORT = 8080;

function startAppServer(callback) {
    const server = express();

    // Serve static resources
    server.use('/', express.static('build/webroot'));
    server.use('/graphql', proxy(`http://localhost:${GRAPHQL_PORT}`));
    server.listen(APP_PORT, () => {
        console.log(`App is now running on http://localhost:${APP_PORT}`);
        if (callback) {
            callback();
        }
    });
}

startAppServer();