const path = require('path')
const webpack = require('webpack')
const CleanPlugin = require('clean-webpack-plugin')

module.exports = {
  mode: 'production',
  entry: {
    'app': path.resolve(__dirname, '../src/index.js')
  },
  output: {
    libraryTarget: 'umd',
    library: 'wutils',
    filename: 'wutils.min.js',
    path: path.resolve(__dirname, '../dist'),
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.(ts(x?)|js(x?))$/,
        exclude: /node_modules/,
        use: [
            'babel-loader'
        ]
      }
    ]
  },
  plugins: [
    new CleanPlugin(['dist'], {
      root: path.resolve(__dirname, '../'),
    })
  ]
}