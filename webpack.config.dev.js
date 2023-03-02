// const HtmlWebpackPlugin = require("html-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
// const CopyWebpackPlugin = require("copy-webpack-plugin");
// const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");
const path = require("path");
const Dotenv = require("dotenv-webpack");

module.exports = {
    entry: "./src/index.js",
    output:{
        path: path.resolve(__dirname, "dist"),
        filename: "[name].[contenthash].js",
        // assetModuleFileName: "assets/images/[hash][ext][query]"
    },
    mode: 'development',
    watch: true,
    resolve: {
        extensions: [".js"],
        alias:{
            '@utils': path.resolve(__dirname, 'src/utils/'),
            '@templates': path.resolve(__dirname, 'src/templates/'),
            '@styles': path.resolve(__dirname, 'src/styles/'),
            '@images': path.resolve(__dirname, 'src/assets/images/')
        }
    },
    module: {
        rules: [
            {
                test: /\.m?js$/,
                exclude: /node_modules/,
                use:{
                    loader: "babel-loader"
                }
            },
            {
                test: /\.css|.styl$/i,
                use:[MiniCssExtractPlugin.loader,
                    "css-loader",
                    "stylus-loader"
                ]
            },
            {
                test: /\.png/,
                type: "asset/resource",
                generator:{
                    filename:"assets/images/[hash][ext][query]"
                }
            },
            {
                test: /\.(woff|woff2)$/,
                use:{
                    loader: "url-loader",
                    options:{
                        limit: 10000,
                        mimetype: "application/font-woff",
                        name: "[name].[contenthash].[ext]",
                        outputPath: "./assets/fonts/",
                        publicPath: "../assets/fonts/",
                        esModule: false
                    }
                },
                generator:{
                    filename:"assets/fonts/[hash][ext][query]"
                }
            }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin({
            inject: true,
            template: "./public/index.html",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: 'assets/[name].[contenthash].css'
        }),
        new Dotenv(),
        // new CopyWebpackPlugin({
        //     patterns: [
        //         {
        //             from: path.resolve(__dirname, "src", "assets/images"),
        //             to: "assets/images"
        //         }
        //     ]
        // })
    ],
    // optimization: {
    //     minimize: true,
    //     minimizer: [
    //         new TerserPlugin(),
    //         new CssMinimizerPlugin()
    //     ]
    // }
  
}