const path = require('path');
const webpack = require('webpack');
const childProcess = require('child_process');
require('dotenv').config();
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',

    entry: {
        main: path.resolve('./src/app.js')
    },

    output: {
        filename: '[name].js',
        path: path.resolve('./dist')
    },
    
    module: {
        rules: [{
            test: /\.js$/,
            use: [path.resolve('./myLoader.js')]
        },
        {
            test: /\.css$/,
            use: [
                'style-loader',
                'css-loader',
            ]
        },
        {
            test: /\.(png|jpg|gif|svg)$/,
            type: 'asset/inline',
            parser: {
                dataUrlCondition: {
                    maxSize: 20 * 1024
                }
            },
        }
    ]
    },
    plugins : [
        new webpack.BannerPlugin({
            banner: `
                Commit version: ${childProcess.execSync('git rev-parse --short HEAD')}
                Comitter: ${childProcess.execSync('git config user.name')}
                Commit Date: ${new Date().toLocaleString()}
            `
        }),
        new webpack.DefinePlugin({
            dev: JSON.stringify(process.env.DEV_API),
            pro: JSON.stringify(process.env.PRO_API),
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}