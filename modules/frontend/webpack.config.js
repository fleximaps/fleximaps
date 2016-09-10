var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');


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
            },
            {
                test: /\.css$/,
                loader: ExtractTextPlugin.extract('style-loader', 'css-loader?modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss-loader')
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
        }
    },
    plugins: [
        new ExtractTextPlugin('fleximaps-frontend.css', { allChunks: true })
    ]
};