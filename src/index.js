import config from './config'
import MetricsFactory from 'metallic-metrics'
import LoggerFactory from 'metallic-logger'
import LauncherFactory from 'metallic-launcher'
export { LEADER, SERVER } from 'metallic-launcher'

export default class Metallic {
  constructor (clientOptions = {}) {
    const options = config(clientOptions)
    const loggerOptions = {
      name: options.name,
      extra: {
        role: options.cluster.role
      },
      ...options.logger
    }
    const metricsOptions = {
      prefix: `${options.name}:${options.cluster.role}`,
      ...options.metrics
    }
    const launcherOptions = {
      port: options.port,
      ...options.cluster
    }

    this._logger = LoggerFactory.create(loggerOptions)
    this._metrics = MetricsFactory.create(this._logger, metricsOptions)
    this._launcher = LauncherFactory.create(this._metrics, this._logger, launcherOptions)
  }

  get role () {
    return this._launcher.role
  }

  get app () {
    return this._launcher.app.provider
  }

  get logger () {
    return this._logger.provider
  }

  get metrics () {
    return this._metrics.provider
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
