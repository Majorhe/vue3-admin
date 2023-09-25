const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  publicPath: './',
  assetsDir: './',
  productionSourceMap: false,
  chainWebpack: config => {
    // 删除预加载
    config.plugins.delete('preload')
    config.plugins.delete('prefetch')
    // 压缩代码
    config.optimization.minimize(true)
    // 分割代码
    config.optimization.splitChunks({
      chunks: 'all'
    })
  },
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'sass',
      patterns: []
    }
  },
  devServer: {
    proxy: {
      '/dev': {
        // 此处的写法，目的是为了 将 /api 替换成 target
        target: 'http://localhost:8088',
        // 允许跨域
        changeOrigin: true,
        ws: true,
        pathRewrite: {
          '^/dev': ''
        }
      }
    }
  }
})
