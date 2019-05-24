const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LiveReloadPlugin = require('webpack-livereload-plugin');

module.exports = {
  entry: './src/client/index.js',
  output: {
    path: path.join(__dirname, 'public'),
    publicPath: '/',
    filename: 'bundle.js',
  },
  module: {
    rules: [{
      test: /\.(js|jsx)$/,
      use: 'babel-loader',
      exclude: /node_modules/,
    }, {
      test: /\.css$/,
      use: ['style-loader', 'css-loader'],
    }, {
      test: /\.scss$/,
      use: [{
        loader: "style-loader"
      }, {
        loader: "css-loader", options: {
          sourceMap: true
        }
      }, {
        loader: "sass-loader", options: {
          sourceMap: true
        }
      }]
    }]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: 'src/client/index.html'
    }),
    new LiveReloadPlugin()
  ]
};
