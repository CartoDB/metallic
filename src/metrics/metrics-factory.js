import { FactoryInterface } from '../interfaces'
import ErrorListener from './error-listener'
import MetricsErrorListenerMixin from './metrics-error-listener-mixin'
import Metrics from './metrics'
import StatsD from 'node-statsd'
import defaults from './defaults'
import MetricsLoggerMixin from './metrics-logger-mixin'
import MetricsGaugeMemoryMixin from './metrics-gauge-memory-mixin'
import MetricsGaugeCPUMixin from './metrics-gauge-cpu-mixin'

export default class MetricsFactory extends FactoryInterface {
  static create ({ logger, options } = {}) {
    const opts = { ...defaults, ...options }

    if (!opts.enabled) {
      return
    }

    const { host, port, prefix, suffix, globalize, cacheDns, mock, globalTags, interval } = opts
    const statsd = new StatsD(host, port, prefix, suffix, globalize, cacheDns, mock, globalTags)
    const errorListener = new ErrorListener(statsd.socket)

    const GaugedMetrics = interval > 0
      ? MetricsGaugeMemoryMixin.mix(
        MetricsGaugeCPUMixin.mix(
          Metrics
        )
      )
      : Metrics

    const LoggedGaugedMetrics = logger
      ? MetricsLoggerMixin.mix(
        MetricsErrorListenerMixin.mix(
          GaugedMetrics
        )
      )
      : Metrics

    const metrics = new LoggedGaugedMetrics({
      provider: statsd,
      errorListener,
      interval,
      logger
    })

    return metrics
  }
}
