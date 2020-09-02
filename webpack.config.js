const HtmlWebPackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: './src/obsy_bootstrap.js',
    devtool: 'source-map',
    output: {
        path: __dirname + '/lib',
        filename: '[name].[contenthash:8].js',
        libraryTarget: 'var',
        library: 'ObsyPlugin',
        // chunkFilename: '[name].bundle.js',
    },
    optimization: {
        splitChunks: {
            chunks: 'all',
        }
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                }
            },
            // {
            //     test: /\.html$/,
            //     use: [
            //         {
            //             loader: "html-loader"
            //         }
            //     ]
            // }
        ]
    },
    // plugins: [
    //     new HtmlWebPackPlugin({
    //         template: "./src/index.html",
    //         filename: "./index.html"
    //     })
    // ]
};