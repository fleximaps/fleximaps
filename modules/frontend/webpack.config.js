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
    node: {
        fs: "empty"
    }
};