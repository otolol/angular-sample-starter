var path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

const ngtools = require('@ngtools/webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJSPlugin = require('uglifyjs-webpack-plugin');



module.exports = function() {
    
    return {
         devtool: 'source-map',
        /**
         * entry files
         */
        entry: {
            polyfills: helpers.root('src/polyfills.browser.ts'),            
            build: helpers.root('src/main-aot.ts')
        },

        /**
         * output files
         */
        output: {
            path: helpers.root('dist'),            
            filename: '[name].js'
        },

        /**
         * resolving modules
         */
        resolve: {
            extensions: ['.js', '.ts', '.html', '.css']
        },

        target: 'node',

        module: {

             loaders: [
                {
                    test: /\.ts$/,
                    loader: '@ngtools/webpack'
                },
                 {
                    test: /\.html$/,
                    loader: 'raw-loader'
                    // exclude: [helpers.root('src/index.html')]d
                },
                {
                    test: /\.css$/,
                    loaders: ['raw-loader']
                }
             ]
        },

        plugins: [
            new htmlWebpackPlugin({ 
                template: helpers.root('src/index-aot.html')
            }),
            // new webpack.optimize.CommonsChunkPlugin({
            //     name: ['build',  'polyfills']   
            // }),


            new ngtools.AotPlugin({
                tsConfigPath: helpers.root('tsconfig-aot.json'),
                 entryModule: helpers.root('src/app/app.module#AppModule')
            })
        ],
       

    }
}