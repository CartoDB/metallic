import assert from 'assert'
import sinon from 'sinon'
import MetricsInterface from '../../src/metrics/metrics-interface'
import MetricsGaugeMemoryMixin from '../../src/metrics/metrics-gauge-memory-mixin'
import LoggerInterface from 'metallic-logger'

class DummyMetrics extends MetricsInterface {
  run () {}
  close () {}
}

class DummyLogger extends LoggerInterface {
  debug () {}
}

describe('metrics-gauge-cpu-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    const provider = this.provider = new DummyMetrics()
    const logger = this.logger = new DummyLogger()
    const interval = 1

    const MemoryMetrics = MetricsGaugeMemoryMixin.mix(DummyMetrics)

    this.metrics = new MemoryMetrics({
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

  it('should bind interval to measure memory usage', async function () {
    const loggerDebugStub = this.sandbox.stub(this.logger, 'debug')

    await this.metrics.run()
    await this.metrics.close()

    assert.equal(typeof this.metrics.memoryInterval, 'object')
    assert.ok(loggerDebugStub.calledTwice)
  })

  it('should not bind interval to measure memory usage', async function () {
    const provider = this.provider = new DummyMetrics()
    const logger = this.logger = new DummyLogger()
    const interval = 0

    const MemoryMetrics = MetricsGaugeMemoryMixin.mix(DummyMetrics)

    this.metrics = new MemoryMetrics({
      interval,
      logger,
      provider
    })

    assert.equal(this.metrics.memoryInterval, undefined)
  })
})
