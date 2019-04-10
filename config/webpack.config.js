const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');

const {
  devServer,
  loadHtml,
  loadImages,
  loadJavascript,
  loadStyles,
} = require('./webpack-modules');

const baseConfig = merge([
  {
    entry: './src/index.jsx',
    resolve: {
      extensions: ['*', '.js', '.jsx'],
    },

    output: {
      path: path.resolve(__dirname, '../static'),
      publicPath: '/',
      filename: 'bundle.[hash].js',
    },
  },
  loadStyles(),
  loadHtml(),
  loadJavascript({ include: path.join(__dirname, '../src') }),
]);

const devConfig = merge([
  {
    plugins: [new webpack.HotModuleReplacementPlugin()],
  },
  devServer(),
  loadImages(),
]);

const prodConfig = merge([
  {
    output: {
      path: path.resolve(__dirname, '../static'),
      publicPath: '/',
      filename: 'bundle.[hash].js',
    },
  },
  loadImages({ options: { limit: 5000 } }),
]);

module.exports = mode =>
  merge(baseConfig, mode !== 'production' ? devConfig : prodConfig, { mode });
