'use strict'

const assert = require('assert')
const sinon = require('sinon')
const MetricsInterface = require('../../lib/metrics/metrics-interface')
const MetricsErrorListenerMixin = require('../../lib/metrics/metrics-error-listener-mixin')
const ErrorListener = require('../../lib/metrics/error-listener')
const EventEmitter = require('events')
const LoggerInterface = require('../../lib/logger')

class DummyMetrics extends MetricsInterface {
  run () {}
  close () {}
}

class DummyLogger extends LoggerInterface {
  error () {}
}

describe('metrics-error-listener-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const provider = this.provider = new DummyMetrics()
    const logger = this.logger = new DummyLogger()
    const emitter = this.emitter = new EventEmitter()
    const errorListener = new ErrorListener(emitter)

    const EventedMetrics = MetricsErrorListenerMixin.mix(DummyMetrics)

    this.metrics = new EventedMetrics({
      errorListener,
      logger,
      provider
    })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.create() should return a Metrics instance', function () {
    assert.ok(this.metrics instanceof MetricsInterface)
  })

  it('should log when socket emits error', async function () {
    const error = new Error('wadus')
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    await this.metrics.run()
    this.emitter.emit('error', error)
    await this.metrics.close()

    assert.ok(loggerErrorStub.calledOnce)
  })
})
