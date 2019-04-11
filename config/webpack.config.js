const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');
const ImageminPlugin = require('imagemin-webpack-plugin').default;

const {
  devServer,
  extractStyles,
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
    plugins: [new ImageminPlugin({ test: /\.(jpe?g|png|svg)$/i })],
    output: {
      path: path.resolve(__dirname, '../static'),
      publicPath: '/',
      filename: 'bundle.[hash].js',
    },
  },
  loadHtml(),
  loadJavascript({ include: path.join(__dirname, '../src') }),
]);

const devConfig = merge([
  {
    plugins: [
      new ErrorOverlayPlugin(),
      new webpack.HotModuleReplacementPlugin(),
    ],
  },
  devServer(),
  loadImages(),
  loadStyles(),
]);

const prodConfig = merge([
  {
    output: {
      path: path.resolve(__dirname, '../static'),
      publicPath: '/',
      filename: 'bundle.[hash].js',
    },
    devtool: 'source-map',
    optimization: {
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            output: {
              comments: false,
            },
          },
          sourceMap: true,
        }),
      ],
    },
  },
  loadImages({ options: { limit: 5000 } }),
  extractStyles(),
]);

module.exports = mode =>
  merge(baseConfig, mode !== 'production' ? devConfig : prodConfig, { mode });
