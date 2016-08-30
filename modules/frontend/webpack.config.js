var path = require('path');

module.exports = {
    module: {
        loaders: [
            {
                exclude: /node_modules/,
                loader: 'babel',
                test: /\.js$/
            },
            {
                loader: 'json',
                test: /\.json$/
            }
        ]
    },
    output: {
        path: __dirname + "/build/js/",
        filename: "fleximaps-frontend.js",
        libraryTarget: 'umd'
    },
    resolve: {
        alias: {
            react: path.resolve('./node_modules/react') //Use only one version of react
        },
    }
};