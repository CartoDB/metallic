const { FactoryInterface } = require('../interfaces')
const App = require('./app')
const Koa = require('koa')
const AppMiddlewares = require('./middlewares/app-middlewares')
const CatchErrorMiddleware = require('./middlewares/catch-error-middleware')
const ErrorMiddleware = require('./middlewares/error-middleware')
const RequestIdMiddleware = require('./middlewares/request-id-middleware')
const LogMiddleware = require('./middlewares/log-middleware')
const MetricsMiddleware = require('./middlewares/metrics-middleware')
const ResponseTimeMiddleware = require('./middlewares/response-time-middleware')
const HttpServerLoggerMixin = require('./http-server-logger-mixin')
const HttpServer = require('./http-server')

module.exports = class HttpServerFactory extends FactoryInterface {
  static create ({ metrics, logger, options } = {}) {
    options = {
      port: 0,
      ...options
    }

    const port = options.port
    const koa = new Koa()

    // add a reference to metrics from ctx
    if (metrics) {
      koa.context.metrics = metrics
    }

    const middlewares = new AppMiddlewares()

    middlewares.add(new CatchErrorMiddleware())

    middlewares.add(new RequestIdMiddleware())

    if (logger) {
      middlewares.add(new LogMiddleware({ logger }))
    }

    if (metrics) {
      middlewares.add(new MetricsMiddleware({ metrics }))
    }

    middlewares.add(new ResponseTimeMiddleware())
    middlewares.add(new ErrorMiddleware())

    const app = new App(koa, middlewares)

    const LoggedHttpServer = logger ? HttpServerLoggerMixin.mix(HttpServer) : HttpServer

    return new LoggedHttpServer({ app, port, logger })
  }
}
