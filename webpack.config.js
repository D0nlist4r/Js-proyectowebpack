    const path = require('path');
    const HtmlWebpackPlugin = require('html-webpack-plugin');
    const MiniCssExtractPlugin = require('mini-css-extract-plugin');
    const CopyPlugin = require('copy-webpack-plugin');
    const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
    const TenzerPlugin = require('terser-webpack-plugin');

    module.exports = {
    // Entry nos permite decir el punto de entrada de nuestra aplicación
    entry: "./src/index.js",
    // Output nos permite decir hacia dónde va enviar lo que va a preparar webpacks
    output: {
        // path es donde estará la carpeta donde se guardará los archivos
        // Con path.resolve podemos decir dónde va estar la carpeta y la ubicación del mismo
            path: path.resolve(__dirname, "dist"),
            // filename le pone el nombre al archivo final
            filename: '[name].[contenthash].js',
            assetModuleFilename: 'assets/images/[hash][ext][query]'
        },
        resolve: {
            // Aqui ponemos las extensiones que tendremos en nuestro proyecto para webpack los lea
            extensions: [".js"]
        },
        optimization:{
            minimize: true,
            minimizer: [
                new CssMinimizerPlugin(),
                new TenzerPlugin(),
            ]
        },
        module: {
                    rules: [
                    { 
                        // Test declara que extensión de archivos aplicara el loader
                        test: /\.js$/,
                        // Use es un arreglo u objeto donde dices que loader aplicaras
                        use: {
                        loader: "babel-loader"
                        },
                        // Exclude permite omitir archivos o carpetas especificas
                        exclude: /node_modules/
                    },
                    {
                        test: /\.css|.styl$/i,
                        use: [ MiniCssExtractPlugin.loader, 'css-loader' , 'stylus-loader' ]
                    },
                    {
                        test: /\.png/,
                        type: "asset/resource"
                    }
                    ]
            },
                plugins: [
                    new HtmlWebpackPlugin({
                    inject: true,
                    template: './public/index.html',
                    filename: './index.html'
                }),
                new MiniCssExtractPlugin({
                    filename: 'assets/[name][contenthash].css'
                }),
                    //Instancia de plugin
                new CopyPlugin({
                        patterns: [
                        {
                            from: path.resolve(__dirname, "src", "assets/images"),
                            to: "assets/images"
                        }
                        ]
                    })
                ]
                }