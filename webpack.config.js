//导入nodejs 的内置模块  path
const path = require('path')

//导入html打包插件  
const HtmlWebpackPlugin = require('html-webpack-plugin')

//引入 提取js中的css代码的插件
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
//将css文件及代码压缩
const OptimizeCssAssetsWebpackPlugin = require('optimize-css-assets-webpack-plugin');

//自动清除dist 
const { CleanWebpackPlugin } = require('clean-webpack-plugin');


module.exports = {
    //入口
    entry: {
        common:'./src/js/commonCss.js',//css公用样式
        // 公用js样式
        dom:'./src/js/common/dom.js',
        http:'./src/js/common/http.js',
        utils:'./src/js/common/utils.js',


        // 三方插件
        swiper:'./src/lib/swiper/swiper-bundle.js',
        captcha:'./src/lib/captcha-mini.js',
        weui:'./src/lib/weui/weui.js',

        home:'./src/js/home.js',  
        login:'./src/js/login.js',  
        register:'./src/js/register.js', 
        poster:'./src/js/poster.js',
        about:'./src/js/about.js',
        edit:'./src/js/edit.js',
    },

    //出口
   
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'js/[name].js',
        publicPath: './'
    },

    //解释器
    module: {
        rules: [
            {
                test: /\.css$/,        
                use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../'
                    }
                },'css-loader','postcss-loader']
            },
          {
                test: /\.less$/, //配置less处理器
              use: [{
                    loader: MiniCssExtractPlugin.loader,
                    options: {
                      publicPath: '../'
                    }
                }, 'css-loader', 'postcss-loader','less-loader']
            },

            {
                test: /\.(jpg|png|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    //重命名 图片
                    name: '[hash:16].[ext]',
                    //限制20kb以内图片进行打包
                    limit: 20 * 1024,
                    esModule: false,
                    outputPath:'img'
                }
            },
            { test: /\.html$/, loader: 'html-loader' },
            { test: /\.(eot|svg|ttf|woff|woff2)$/, loader: 'file-loader',options:{
                outputPath:'fonts' 
            } },
            {
                test: /\.js$/,
                loader: 'babel-loader', // loader 编译es6为es5
                exclude: /node_modules/ // 排除
            }
        ],
    },

    //插件
    plugins: [
     
        //打包html 及html中的图片
        new HtmlWebpackPlugin({   
            template: './src/page/home.html',         
            filename:'home.html',
            chunks:['home','common','dom','http','utils','swiper']                            
        }),
        new HtmlWebpackPlugin({  
            template: './src/page/login.html',        
            filename:'login.html',
            chunks:['login','common','dom','http','utils']      
        }),
        new HtmlWebpackPlugin({   
            template: './src/page/register.html',       
            filename:'register.html',
            chunks:['register','common','dom','http','captcha','utils']      
        }),
        new HtmlWebpackPlugin({   
            template: './src/page/poster.html',       
            filename:'poster.html',
            chunks:['poster','common','dom']      
        }),
        new HtmlWebpackPlugin({   
            template: './src/page/about.html',       
            filename:'about.html',
            chunks:['about','common','dom','http','utils']      
        }),
        new HtmlWebpackPlugin({   
            template: './src/page/edit.html',       
            filename:'edit.html',
            chunks:['edit','common','dom','http','utils','weui']      
        }),

        //提取js中的css代码
        new MiniCssExtractPlugin({
            filename: 'css/[name].css'
        }),
        new OptimizeCssAssetsWebpackPlugin(),

        //plugin 添加
        new CleanWebpackPlugin()


    ],

    //环境 
    mode: process.env.NODE_ENV,

    //热更新 本地服务启动
   
    devServer: {
        contentBase: path.resolve(__dirname, 'dist'), 
        compress: true, 
        port: 8086, 
        open: true, 
        publicPath: '/', 
        openPage: 'poster.html', 
    },
    target: 'web', 
}