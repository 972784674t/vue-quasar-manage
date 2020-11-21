const timeStamp = new Date().getTime()
module.exports = {
  publicPath: process.env.NODE_ENV === 'production' ? '/vue-quasar-manage/' : '/',
  devServer: {
    port: 8868
  },
  pluginOptions: {
    quasar: {
      importStrategy: 'kebab',
      rtlSupport: false
    }
  },
  transpileDependencies: [
    'quasar',
    'vue-echarts',
    'resize-detector'
  ],
  // 打包的时候不使用hash值.因为我们有时间戳来确定项目的唯一性了.
  filenameHashing: false,
  configureWebpack: {
    // 输出重构 打包编译后的js文件名称，添加时间戳.
    output: {
      filename: `js/[name].${timeStamp}.js`,
      chunkFilename: `js/[name].${timeStamp}.js`
    }
  },
  css: {
    // 打包后css文件名称添加时间戳
    extract: {
      filename: `css/[name].${timeStamp}.css`,
      chunkFilename: `css/[name].${timeStamp}.css`
    }
  }
}
