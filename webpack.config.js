const ExtractTextPlugin = require("extract-text-webpack-plugin");

module.exports = {
  entry: './src/client/application.js',
  output: {
    path: __dirname,
    filename: './src/dist/bundle.js'
  },
  devtool: 'source-map',
  module: {
    loaders: [
      {
        test: [/\.js$/, /\.es6$/],
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      }, {
        test: /\.scss$/,
        loaders: [
          "style-loader", 
          {
            loader: 'css-loader',
            query: {
              modules: true,
              localIdentName: '[name]__[local]___[hash:base64:5]'
            }
          }
          , "sass-loader"],
      }, {
        test: /\.(jpg|png|svg)$/,
        loader: 'file',
        include: '/img/goofy2.png'
      }
    ]
  },
  node: {
    console: true,
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  }
};