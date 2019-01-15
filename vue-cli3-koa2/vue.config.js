module.exports = {
  runtimeCompiler: true,
  configureWebpack: {
    externals: {
      gConf: '__gConf',
      wx: 'wx'
    }
  }
}
