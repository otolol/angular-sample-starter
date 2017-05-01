var path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');
const HOST = 'localhost';
const PORT = 3000;

const htmlWebpackPlugin = require('html-webpack-plugin');


module.exports = function() {
    
    return {
        /**
         * entry files
         */
        entry: {
            polyfills: './src/polyfills.browser.ts',
            main: './src/main.ts',
        },

        /**
         * output files
         */
        output: {
            path: path.resolve(__dirname, 'dist' ),
            filename: '[name].js'
        },

        /**
         * resolving modules
         */
        resolve: {
            extensions: ['.js', '.ts', '.json']
        },


        module: {
             exprContextCritical: false,

             loaders: [
                 {
                     test: /\.ts$/,
                     loaders: [
                        'awesome-typescript-loader',
                     ],
                    //  include: [helpers.root('src')],
                     exclude: [helpers.root('src/uni/**/*.ts'), helpers.root('src/main-aot.ts')]
                 },

                 {
                    test: /\.json$/,
                    loader: 'json-loader',
                 }
             ]
        },

        plugins: [
            new htmlWebpackPlugin({ 
                template: 'src/index.html'
            }),

            new webpack.optimize.CommonsChunkPlugin({
                name: ['main',  'polyfills']   
            }),

        ],

        /**
         * dev server configuration
        */
        devServer: {
            port: PORT,
            host: HOST,
            historyApiFallback: true,
            watchOptions: {
                aggregateTimeout: 300,
                poll: 1000
            },
            contentBase: helpers.root('dist')
        }

    }
}