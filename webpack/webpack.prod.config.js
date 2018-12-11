const webpack = require('webpack');
const path = require('path');
const webpackConfigBase = require('./webpack.base.config');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const webpackConfigProd = {
    mode: 'production',
    output:{
        path:path.join(__dirname,'../build'),//出口文件
        filename:'[name]-[chunkhash].js',
        chunkFilename: '[name].[chunkhash:8].js'
    },
    module:{
        rules:[
            { 
                test: /\.(js|jsx)?$/,
                exclude:/(node_modules)/,
                use:[ 
                    { 
                        loader:'babel-loader'
                    } 
                ] 
            }
        ]
    },
    plugins:[
        new  CleanWebpackPlugin(['build'],{root: path.join(__dirname,'../')})
    ]
};
module.exports = merge(webpackConfigBase, webpackConfigProd);