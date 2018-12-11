const webpack = require('webpack');
const path = require('path');
const merge = require('webpack-merge');//文件合并
const webpackConfigBase = require('./webpack.base.config');
const openBrowserPlugin = require('open-browser-webpack-plugin');//在浏览器中打开程序
const arrProxy = [
    '/regist',
    '/login',
    '/connect',
    '/invest/fund/api',
    '/myaccount',
    '/hqb',
    '/profile',
    '/monthbill',
    '/alert',
    '/ajax',
    '/bid',
    '/export',
    '/soeasy',
    '/invest',
    '/transfer',
    '/fb',
    '/detail',
    '/trust',
    '/agreement',
    '/mall',
    '/newbid',
    '/lottery',
    '/timeLimitInvite',
    '/pcBanner'
];

let proxy = {};
arrProxy.forEach((item, i) => {
    proxy[item] = {
        changeOrigin: true,
        target: 'http://webapi.soydai.cn:3499',
        secure: false,
        pathRewrite: {}
    }
    proxy[item].pathRewrite[item] = '/apitest' + item;
});

const webpackConfigDev = {
    mode:'development',
    output:{
        path:path.join(__dirname,'../build'),//出口文件
        filename:'[name].js',
    },
    devtool:'cheap-module-eval-source-map',
    module:{
        rules:[
            {
                test: /\.(js|jsx)?$/,
                exclude:/(node_modules)/,
                enforce: 'pre',
                use:[
                    {
                        loader:'babel-loader'
                    },{
                        loader:'eslint-loader',
                        options: {
                            formatter: require('eslint-friendly-formatter'),
                            emitWarning: false
                        }
                    }
                ]     //jsx js转码配置
            }
        ]
    },
    plugins:[
        // new openBrowserPlugin({url:'http://localhost:8080'}),
        new webpack.LoaderOptionsPlugin({
            options: {
                eslint:{
                    configFile: './.eslintrc.json'
                }
            }
        })
    ],
    
    devServer:{
        proxy: proxy,
        watchOptions: {
            ignored: /node_modules/
        },
        contentBase: path.join(__dirname,'../public'),
        hot: true,
        host:'0.0.0.0',
        inline: true,
        port: 8080,
    }
}
module.exports = merge(webpackConfigBase, webpackConfigDev);