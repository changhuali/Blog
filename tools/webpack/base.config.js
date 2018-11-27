const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

global.__DEV__ = process.env.NODE_ENV !== 'production';

const getOutput = () => {
  return {
    path: path.resolve(__dirname, '../../dist/assets'),
    publicPath: '/assets/',
    filename: '[name].js',
  };
}

const webpackMode = __DEV__ ? 'development' : 'production';

module.exports = {
  mode: webpackMode,
  output: {
    path: path.resolve(__dirname, '../../dist/assets'),
    publicPath: '/assets',
    filename: '[name].js',
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        include: [
          path.resolve(__dirname, '../../src')
        ],
        loader: 'vue-loader',
      },
      {
        test: /\.js$/,
        include: [
          path.resolve(__dirname, '../../src')
        ],
        exclude: [
          '/node_modules/',
        ],
        loader: 'babel-loader',
      },
      {
        test: /\.(css|less)$/,
        loader: [
          'vue-style-loader',
          'css-loader',
          'postcss-loader',
          'less-loader',
        ],
      },
      {
        test: /\.(png|jpg|gif|svg)$/i,
        loader: 'url-loader'
      },
    ],
  },
  resolve: {
    modules: [
      'node_modules',
      path.resolve(__dirname, '../../src'),
    ],
    extensions: ['.js', '.vue', '.css', '.less'],
  },
  plugins: [
    new VueLoaderPlugin(),
  ],
};
