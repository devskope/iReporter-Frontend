const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const cssNano = require('cssnano');

exports.devServer = () => ({
  devServer: {
    contentBase: './static',
    historyApiFallback: true,
    hot: true,
    open: true,
    stats: 'errors-only',
  },
});

exports.loadHtml = () => ({
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ['html-loader'],
      },
    ],
  },

  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
  ],
});

exports.loadJavascript = ({ include } = {}) => ({
  module: {
    rules: [
      {
        include,
        test: /\.(js|jsx)$/,
        use: [
          'babel-loader',
          {
            loader: 'eslint-loader',
            options: {
              useEslintrc: true,
            },
          },
        ],
      },
    ],
  },
});

exports.loadStyles = ({ include } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
});

exports.extractStyles = ({ include } = {}) => ({
  module: {
    rules: [
      {
        test: /\.css$/,
        include,
        use: [
          MiniCssExtractPlugin.loader,
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                cssNano({
                  preset: [
                    'default',
                    {
                      discardComments: { removeAll: true },
                      cssDeclarationSorter: { order: 'smacss' },
                    },
                  ],
                }),
              ],
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash:8].css',
    }),
  ],
});

exports.loadImages = ({ include, options } = {}) => ({
  module: {
    rules: [
      {
        test: /(.jpg|.jpeg|.svg|.png)$/,
        include,
        use: [
          {
            loader: 'url-loader',
            options,
          },
        ],
      },
    ],
  },
});
