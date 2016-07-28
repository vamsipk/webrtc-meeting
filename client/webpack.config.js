const webpack = require('webpack');
const path = require('path');

module.exports = {
    cache: false,
    entry:  './index.js',
    output: {
        path:     'builds',
        filename: 'bundle.js',
        publicPath: 'builds/'
    },
    /*plugins: [
        new webpack.optimize.CommonsChunkPlugin({
            name:      'main', // Move dependencies to our main file
            children:  true, // Look for common dependencies in all children,
            minChunks: 2 // How many times a dependency must come up before being extracted
        })
    ],*/
    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules|bower_components)/,
                loader: 'babel',
                query: {
                    presets: ['es2015']
                }
            },{
                test:   /\.scss/,
                loaders: ['style', 'css', 'sass']
            },
            {
                test:   /\.html/,
                loader: 'ng-cache?prefix=[dir]/[dir]'
            }
        ]
    },
    resolve: {
        root: path.resolve('./')
    }
};
