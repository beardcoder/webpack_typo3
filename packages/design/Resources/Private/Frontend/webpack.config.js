/* eslint-disable @typescript-eslint/no-var-requires */
const webpack = require('webpack');
const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const TerserJSPlugin = require('terser-webpack-plugin');

const isDev = process.env.NODE_ENV !== 'production';
module.exports = {
    mode: process.env.NODE_ENV,
    devtool: isDev ? 'source-map' : 'cheap-source-map',
    entry: {
        main: './src/main.ts',
    },
    module: {
        rules: [
            {
                test: /\.css$/,
                use: [
                    {
                        loader: MiniCssExtractPlugin.loader,
                        options: { sourceMap: isDev },
                    },
                    {
                        loader: 'css-loader',
                        options: {
                            url: false,
                            import: false,
                            importLoaders: 1,
                            sourceMap: isDev,
                        },
                    },
                    { loader: 'postcss-loader', options: { sourceMap: isDev } },
                ],
            },
            {
                test: /\.tsx?$/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            extends: './.babelrc',
                        },
                    },
                ],
            },
        ],
    },
    output: {
        path: path.resolve(__dirname, '../../Public/Frontend/'),
        filename: 'Scripts/[name].js',
        chunkFilename: 'Scripts/[name].[contenthash].js',
        publicPath: '/typo3conf/ext/design/Resources/Public/Frontend/',
    },
    optimization: {
        minimize: !isDev,
        minimizer: [new TerserJSPlugin()],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'Styles/[name].css',
            ignoreOrder: false, // Enable to remove warnings about conflicting order
        }),
        new CleanWebpackPlugin(),
    ],
    resolve: {
        alias: {
            '@': path.resolve(__dirname, 'Scripts/'),
            '~': path.resolve(__dirname, 'Scripts/'),
        },
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.json', '.vue'],
    },
};
