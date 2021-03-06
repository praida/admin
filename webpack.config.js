const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const pkg = require('./package.json');

module.exports = {
  devtool: 'source-map',
  entry: [
    './index.js'
  ],
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[hash].min.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        loader: 'babel-loader',
        exclude: /node_modules/,
        options: {
          presets: ['es2015', 'react', 'stage-0']
        }
      },
      {
        test: /\.scss$/,
        exclude: /node_modules/,
        use: [
          'style-loader',
          {
            loader: 'css-loader',
            options: {
              importLoaders: 1,
              sourceMap: true
            }
          },
          'postcss-loader',
          'sass-loader'
        ]
      }
    ]
  },
  plugins: [
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'dev'),
        VERSION: JSON.stringify(pkg.version),
        API_URL: JSON.stringify(process.env.PRAIDA_API_URL)
      },
    }),
    new HtmlWebpackPlugin({
      template: 'index.template.html',
    }),
    new webpack.HotModuleReplacementPlugin(),
  ],

  devServer: {
    port: 3000,
    compress: false,
    inline: true,
    hot: true,
    disableHostCheck: true,
    contentBase: path.resolve(__dirname, './assets/'),
    stats: {
      assets: true,
      children: false,
      chunks: false,
      hash: false,
      modules: false,
      timings: true,
      version: false,
      warnings: true,
      colors: {
        green: '\u001b[32m',
      },
    },
  },
};
