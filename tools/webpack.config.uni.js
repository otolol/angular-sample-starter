var path = require('path');
const webpack = require('webpack');
const helpers = require('./helpers');

const ngtools = require('@ngtools/webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');



module.exports = function() {
    
    return {
         devtool: 'source-map',
        /**
         * entry files
         */
        entry: {
            // polyfills: './src/polyfills.browser.ts',            
            server: [helpers.root('src/uni/app.server.ts') , helpers.root('src/uni/server-aot.ts')],
        },

        /**
         * output files
         */
        output: {
            path: helpers.root('dist'),
            filename: 'server.js'
        },

        /**
         * resolving modules
         */
        resolve: {
            extensions: ['.js', '.ts', '.html', '.css']
        },

        target: 'node',

        module: {
        exprContextCritical: false,
        loaders: [
                {
                    test: /\.ts$/,
                    loader: '@ngtools/webpack'
                },
                {
                    test: /\.html$/,
                    loaders: ['raw-loader']
                    // exclude: [helpers.root('src/index.html')]
                },
                {
                    test: /\.css$/,
                    loaders: ['raw-loader']
                    // exclude: [helpers.root('src/index.html')]
                }
             ]
        },

        plugins: [
            new htmlWebpackPlugin({ 
                template: helpers.root('src/index-aot.html')
            }),

            new ngtools.AotPlugin({
                tsConfigPath: helpers.root('tsconfig-uni.json')
            })
        ],
       

    }
}