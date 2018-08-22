const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');

const getEntry = () => {
  if (__DEV__) {
    return [
      'webpack-hot-middleware/client',
      path.resolve(__dirname, '../../src/entry-client.js')
    ];
  }
  return [path.resolve(__dirname, '../../src/entry-client.js')];
}

const getPlugin = () => {
  if (__DEV__) {
    return [
      new webpack.HotModuleReplacementPlugin(),
      new VueSSRClientPlugin(),
    ];
  }
  return [
    new VueSSRClientPlugin(),
  ];
}

module.exports = merge(baseConfig, {
  entry: getEntry(),
  plugins: getPlugin(),
});
