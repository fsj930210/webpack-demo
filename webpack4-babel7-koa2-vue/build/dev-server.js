require('./check-versions')()
const path = require('path')
const config = require('../config')
const { devMiddleware, hotMiddleware } = require("koa-webpack-middleware");
if (!process.env.NODE_ENV) {
  process.env.NODE_ENV = JSON.parse(config.dev.env.NODE_ENV)
}

const webpack = require('webpack')
const webpackConfig = require('./webpack.dev.conf')

module.exports = function (app, cb) {
  let _resolve
  let readyPromise = new Promise(resolve => { _resolve = resolve })
  const ready = (...args) => {
    _resolve()
    cb(...args)
  }
  // dev middleware
  const compiler = webpack(webpackConfig)
  const webpackDevMiddleware = devMiddleware(compiler, {
    publicPath: webpackConfig.output.publicPath,
    quiet: true
  })
  // app.use(devMiddleware)

  compiler.hooks.done.tapAsync('html-webpack-plugin', (stats) => {
    const fs = webpackDevMiddleware.fileSystem
    const readFile = file => fs.readFileSync(path.join(webpackConfig.output.path, file), 'utf-8')
    let template
    try {
      template = readFile('index.html')
    } catch (e) {
      template = '首页文件未生成，请检查代码错误'
    }
    ready({template})
  })

  // hot middleware
  const webpackHotMiddleware = hotMiddleware(compiler, {
    log: () => {}
  })
  // force page reload when html-webpack-plugin template changes
  // compiler.hooks.afterEmit.tapAsync('html-webpack-plugin', function (compilation) {
  //   webpackHotMiddleware.publish({ action: 'reload' })
  //   cb()
  // })
  app.use(webpackHotMiddleware)

  webpackDevMiddleware.waitUntilValid(() => {
    console.log('yeah! you can start it!')
    _resolve()
  })

  return {
    readyPromise,
    devMiddleware: webpackDevMiddleware
  }
}
