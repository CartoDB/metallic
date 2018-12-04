const assert = require('assert')
const sinon = require('sinon')
const MetricsInterface = require('../../src/metrics/metrics-interface')
const MetricsLoggerMixin = require('../../src/metrics/metrics-logger-mixin')
const { LoggerInterface } = require('../../src/logger')

class DummyMetrics extends MetricsInterface {
  run () {}
  close () {}
  timing () {}
  gauge () {}
  unique () {}
  set () {}
  increment () {}
  decrement () {}
  histogram () {}
}

class DummyLogger extends LoggerInterface {
  debug () {}
}

describe('metrics-error-listener-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const provider = this.provider = new DummyMetrics()
    const logger = this.logger = new DummyLogger()

    const LoggedMetrics = MetricsLoggerMixin.mix(DummyMetrics)

    this.metrics = new LoggedMetrics({
      logger,
      provider
    })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.run() should debug a message', async function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    await this.metrics.run()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.close() should debug a message', async function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    await this.metrics.close()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.timing() should debug a message', function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics.timing()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.gauge() should debug a message', function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics.gauge()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.unique() should debug a message', function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics.unique()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.set() should debug a message', function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics.set()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.increment() should debug a message', function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics.increment()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.decrement() should debug a message', function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics.decrement()

    assert.ok(debugErrorStub.calledOnce)
  })

  it('.histogram() should debug a message', function () {
    const debugErrorStub = this.sandbox.stub(this.logger, 'debug')

    this.metrics.histogram()

    assert.ok(debugErrorStub.calledOnce)
  })
})
