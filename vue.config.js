const CompressionPlugin = require('compression-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  devServer: {
    https: true
  },
  chainWebpack(config) {
    config.plugins.delete('prefetch');
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: false
    }
  },
  configureWebpack: {
    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    ]
  },
  transpileDependencies: [
    'vuetify'
  ]
}
