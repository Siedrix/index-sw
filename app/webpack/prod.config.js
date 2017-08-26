const ExtractTextPlugin = require('extract-text-webpack-plugin')

const config = require('../../config')

const path = require('path')
const webpack = require('webpack')

console.log('=>', path.resolve('../dist'))
module.exports = {
  context: __dirname,
  entry: [
    'babel-polyfill',
    '../frontend/index.js'
  ],
  output: {
    path: path.resolve('./app/dist'),
    filename: 'bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
        query: {
          presets: ['es2015', 'stage-0', 'react']
        }
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: ['css-loader', 'sass-loader']
        })
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'bundle.css'
    }),
    new webpack.DefinePlugin({
      'ENV': JSON.stringify(config.env),
      'API_HOST': JSON.stringify(config.server.apiHost)
    }),
    new webpack.optimize.UglifyJsPlugin({
      sourceMap: true,
      compress: {
        warnings: false
      }
    })
  ],
  resolve: {
    modules: ['node_modules'],
    alias: {
      '~core': path.resolve('./app/frontend/core'),
      '~components': path.resolve('./app/frontend/components')
    }
  }
}
