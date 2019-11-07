/** @type import('webpack').Configuration */

const path = require('path');
const webpack = require('webpack');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const StyleLintPlugin = require('stylelint-webpack-plugin');
const cssnano = require('cssnano');
const { develop, production } = require('./src/env');

const isProduction = process.env.NODE_ENV !== 'development';
module.exports = {
  entry: {
    index: './src/index.tsx',
  },
  // devtool: isProduction ? false : 'inline-source-map',
  output: {
    path: path.join(__dirname, './dist'),
    filename: '[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  module: {
    rules: [
      {
        enforce: 'pre',
        test: /\.(t|j)sx?$/,
        loader: 'eslint-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: [{
          loader: 'ts-loader',
          options: { allowTsInNodeModules: true },
        }],
      }, {
        test: /\.scss$/,
        use: [
          {
            loader: 'style-loader',
          }, {
            loader: 'css-loader',
            options: {
              modules: {
                localIdentName: '[name]__[local]_[hash:base64:6]',
              },
              importLoaders: 3,
            },
          },
          {
            loader: 'postcss-loader',
            options: {
              plugins: [
                cssnano({ preset: ['default', { normalizeUrl: false }] }),
              ],
            },
          },
          {
            loader: 'sass-loader',
          },
        ],
      },
    ],
  },
  plugins: [
    new CopyWebpackPlugin([
      { from: './src/index.html' },
    ]),
    new webpack.DefinePlugin({
      ENV: JSON.stringify(isProduction ? production : develop),
      BUILD: JSON.stringify((() => {
        const current = new Date();
        const formatter = num => `00${num}`.slice(-2);
        return [
          current.getFullYear(),
          formatter(current.getMonth() + 1),
          formatter(current.getDate()),
          formatter(current.getHours()),
          formatter(current.getMinutes()),
        ].join('');
      })()),
    }),
    new StyleLintPlugin(),
  ],
};
