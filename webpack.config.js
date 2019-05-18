const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  entry: {
    'bundle.js': './client/client.js',
    'bundle.css': './client/style.scss'
  },
  devtool: 'source-map',
  output: {
    path: __dirname + '/dist/client',
    filename: '[name]'
  },
  resolve: {
    extensions: ['.js', '.jsx', '.scss'],
    alias: {
      meteor: __dirname + '/imports/meteor',
      '/imports': __dirname + '/../imports',
      client: __dirname + '/../client'
    }
  },
  module: {
    rules: [{
      test: /\.jsx?$/,
      use: ['source-map-loader'],
      enforce: 'pre'
    }, {
      test: /\.jsx?$/,
      exclude: /(node_modules|bower_components)/,
      use: [{
        loader: 'cache-loader'
      }, {
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react']
        }
      }]
    }, {
      test: /\.scss$/,
      use: ExtractTextPlugin.extract(['cache-loader', 'css-loader', 'sass-loader'])
    }]
  },
  plugins: [
    new ExtractTextPlugin('bundle.css')
  ]
};
