'use strict'

const config = require('./config')
const MetricsFactory = require('./metrics')
const { MetricsInterface } = MetricsFactory
const LoggerFactory = require('./logger')
const { LoggerInterface } = LoggerFactory
const HttpServerFactory = require('./app')
const LauncherFactory = require('./launcher')

module.exports = class Metallic {
  constructor (clientOptions = {}) {
    const options = config(clientOptions)

    const logger = this._logger = LoggerFactory.create({
      options: {
        name: options.name,
        extra: {
          role: options.cluster.role
        },
        ...options.logger
      }
    })

    const metrics = this._metrics = MetricsFactory.create({
      logger,
      options: {
        prefix: `${options.name}:${options.cluster.role}`,
        ...options.metrics
      }
    })

    const httpServer = this._httpServer = HttpServerFactory.create({
      metrics,
      logger,
      options: {
        port: options.port
      }
    })

    this._launcher = LauncherFactory.create({
      httpServer,
      metrics,
      logger,
      options: {
        port: options.port,
        ...options.cluster
      }
    })
  }

  get role () {
    return this._launcher.role
  }

  get app () {
    return this._httpServer.provider
  }

  get logger () {
    if (this._logger instanceof LoggerInterface) {
      return this._logger.provider
    }
  }

  get metrics () {
    if (this._metrics instanceof MetricsInterface) {
      return this._metrics.provider
    }
  }

  get start () {
    return this._launcher.run.bind(this._launcher)
  }

  get stop () {
    return this._launcher.close.bind(this._launcher)
  }

  get exit () {
    return this._launcher.exit.bind(this._launcher)
  }
}
