'use strict'

const { FactoryInterface } = require('../interfaces')
const ErrorListener = require('./error-listener')
const MetricsErrorListenerMixin = require('./metrics-error-listener-mixin')
const Metrics = require('./metrics')
const StatsD = require('node-statsd')
const defaults = require('./defaults')
const MetricsLoggerMixin = require('./metrics-logger-mixin')
const MetricsGaugeMemoryMixin = require('./metrics-gauge-memory-mixin')
const MetricsGaugeCPUMixin = require('./metrics-gauge-cpu-mixin')

module.exports = class MetricsFactory extends FactoryInterface {
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
