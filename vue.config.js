const CompressionPlugin = require('compression-webpack-plugin');

module.exports = {
  chainWebpack(config) {
    config.plugins.delete('prefetch');
    config.plugin('CompressionPlugin').use(CompressionPlugin);
  },
  pluginOptions: {
    webpackBundleAnalyzer: {
      openAnalyzer: true
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
