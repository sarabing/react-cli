const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');//html插件，需要安装依赖项 npm install htmp-webpack-plugin --save-dev
const MiniCssExtractPlugin = require('mini-css-extract-plugin');//压缩css文件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HappyPack = require('happypack');
module.exports = {
    entry:{
        main: path.join(__dirname,'../src/index.js'), //入口文件
        common:['react','react-dom']
    },
    resolve:{
        extensions:['.js','.jsx','json','.css'], //需要编译的文件类型 能够使用户在引入模块时不带扩展
        // modules: [path.resolve(__dirname, 'node_modules')],
        alias: {
            common: path.resolve(__dirname, 'src/components/common') //在导入时使用相对路径
        }
    },
    performance: {
        hints: false
    },
    module:{
        rules:[
            {
                test: /\.js$/,
                // 把对 .js 文件的处理转交给 id 为 babel 的 HappyPack 实例
                use: ['happypack/loader?id=babel'],
                // 排除 node_modules 目录下的文件，node_modules 目录下的文件都是采用的 ES5 语法，没必要再通过 Babel 去转换
                exclude: path.resolve(__dirname, 'node_modules'),
            },
            {
                // 把对 .css 文件的处理转交给 id 为 css 的 HappyPack 实例
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                  use: ['happypack/loader?id=css'],
                }),
            },
            
            {
                test: /\.css$/,
                use:[MiniCssExtractPlugin.loader,'css-loader'], //css转码，需要安装依赖项css-loader
            },
            {
                test: /\.(scss|sass)$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader' // translates CSS into CommonJS
                    }, 
                    {
                        loader: 'sass-loader' // compiles Sass to CSS
                    }
                ]

            },
            { 
                test:/\.html$/, 
                use:[ 
                    { 
                        loader:'html-loader', 
                        options: {minimize: true} 
                    } 
                ] 
            }, 
            {
                test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
                use: [
                  {
                    loader: 'url-loader',
                    options: {
                      limit: 10000,    // 小于10000kb自动转base64
                      name: 'static/images/[name].[hash:7].[ext]'
                    }
                  }
                ]
            },
            { 
                test:/\.(svg|png)$/, 
                use:'file-loader', //加载文件 
            }
        ] 
    }, 
    plugins:[
        new HappyPack({
            // 用唯一的标识符 id 来代表当前的 HappyPack 是用来处理一类特定的文件
            id: 'babel',
            // 如何处理 .js 文件，用法和 Loader 配置中一样
            loaders: ['babel-loader?cacheDirectory']
            // ... 其它配置项
        }),
        new HappyPack({
            id: 'css',
            // 如何处理 .css 文件，用法和 Loader 配置中一样
            loaders: ['css-loader']
        }),
        new ExtractTextPlugin({
            filename: `[name].css`
        }),
        new HtmlWebpackPlugin({ 
            filename: 'index.html', 
            template: path.join(__dirname, '../public/index.html') 
        }),
        new MiniCssExtractPlugin({ 
            filename: '[name].css', 
            chunkFilename: '[id].css' 
        }) 
    ]
}