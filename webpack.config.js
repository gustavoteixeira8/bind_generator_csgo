const { resolve } = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  mode: 'production',
  entry: resolve('src', 'index.ts'),
  output: {
    filename: 'bundle.js',
    path: resolve(__dirname, 'public', 'assets')
  },
  plugins: [
      new MiniCssExtractPlugin({
        filename: 'style.css',
      }),
      new webpack.ProvidePlugin({
        $: 'jquery',
        jQuery: 'jquery'
      })
  ],
  optimization: {
    minimize: true,
    minimizer: [ new CssMinimizerPlugin(), new TerserPlugin() ],
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        exclude: /node_modules/,
        test: /\.js$/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader']
      },
      {
        test: /\.(png|svg|jpe?g|gif)$/,
        loader: 'file-loader',
        options: {
          name: '[name].[ext]',
        }
      },
    ]
  },
  // devtool: 'source-map',
};
