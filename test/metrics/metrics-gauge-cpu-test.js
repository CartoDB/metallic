const assert = require('assert')
const sinon = require('sinon')
const MetricsInterface = require('../../src/metrics/metrics-interface')
const MetricsGaugeCpuMixin = require('../../src/metrics/metrics-gauge-cpu-mixin')
const LoggerInterface = require('../../src/logger')

class DummyMetrics extends MetricsInterface {
  run () {}
  close () {}
}

class DummyLogger extends LoggerInterface {
  debug () {}
}

describe('metrics-gauge-cpu-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const provider = this.provider = new DummyMetrics()
    const logger = this.logger = new DummyLogger()
    const interval = 1

    const CpuMetrics = MetricsGaugeCpuMixin.mix(DummyMetrics)

    this.metrics = new CpuMetrics({
      interval,
      logger,
      provider
    })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be a Metrics instance', function () {
    assert.ok(this.metrics instanceof MetricsInterface)
  })

  it('should bind interval to measure CPU usage', async function () {
    const loggerDebugStub = this.sandbox.stub(this.logger, 'debug')

    await this.metrics.run()
    await this.metrics.close()

    assert.strictEqual(typeof this.metrics.cpuInterval, 'object')
    assert.ok(loggerDebugStub.calledTwice)
  })

  it('should not bind interval to measure CPU usage', async function () {
    const provider = this.provider = new DummyMetrics()
    const logger = this.logger = new DummyLogger()
    const interval = 0

    const MemoryMetrics = MetricsGaugeCpuMixin.mix(DummyMetrics)

    this.metrics = new MemoryMetrics({
      interval,
      logger,
      provider
    })

    assert.strictEqual(this.metrics.cpuInterval, undefined)
  })
})
