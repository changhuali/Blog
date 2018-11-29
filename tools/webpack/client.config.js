const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const baseConfig = require('./base.config.js');
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

const getEntry = () => {
  if (__DEV__) {
    return [
      'webpack-hot-middleware/client',
      path.resolve(process.cwd(), 'src/entry-client.js')
    ];
  }
  return [path.resolve(process.cwd(), 'src/entry-client.js')];
}

const getPlugin = () => {
  const plugins = [
    new VueSSRClientPlugin(),
  ];
  if (__DEV__) {
    plugins.push(
      new webpack.HotModuleReplacementPlugin(),
    );
  } else {
    plugins.push(
      new CleanWebpackPlugin(
        ['dist'],
        {
          root: process.cwd(),
        }
      ),
      new UglifyJsPlugin({
        uglifyOptions: {
          output: {
            comments: false,
            beautify: false,
          },
        }
      }),
    );
  }
  return plugins;
}

module.exports = merge(baseConfig, {
  entry: getEntry(),
  plugins: getPlugin(),
});
