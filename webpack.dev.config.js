/* eslint-disable no-process-env */
'use strict'

const path = require('path')
const webpack = require('webpack')
const prod = process.env.NODE_ENV === 'production'

const config = {
  devtool: prod ? false : 'eval',
  
  entry: [path.join(__dirname, 'demo', 'src', 'app.js')],

  output: {
    path: path.join(__dirname, 'demo', 'dist', 'js'),
    filename: 'app.js',
    libraryTarget: 'umd',
    publicPath: '/static/'
  },
  // devServer:{
  //   inline: true,
  //   hot: true,
  //   port: 3000
  // },
  externals: {
    react: {
      root: 'React',
      commonjs: 'react',
      commonjs2: 'react',
      amd: 'react'
    },
    'react-dom': {
      root: 'ReactDOM',
      commonjs: 'react-dom',
      commonjs2: 'react-dom',
      amd: 'react-dom'
    }
  },

  module: {
    loaders: [{
      test: /\.css$/,
      loader: "style!css",
  }, {
      test: /\.jsx?$/,
      exclude: /node_modules/,
      loaders: [
          'react-hot-loader', 'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
      ]
  }, {
      test: /\.js?$/,
      exclude: /(node_modules|bower_components)/,
      loaders: [
          'babel-loader?presets[]=react,presets[]=es2015,presets[]=stage-0'
      ]
  }, {
      test: /\.less$/,
      loader: 'style-loader!css-loader!less-loader'
  }, {
      test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
      loader: 'url-loader',
      query: {
          limit: 10000
      }
  }, {
     test: /\.json$/,
     loader: 'json-loader'
   }]
  },

  plugins: []
}

if (prod) {
  config.plugins.push(
    new webpack.DefinePlugin({'process.env.NODE_ENV': JSON.stringify('production')})
  )
  config.plugins.push(new webpack.optimize.UglifyJsPlugin())
}

module.exports = config
