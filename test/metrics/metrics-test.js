'use strict'

const assert = require('assert')
const sinon = require('sinon')
const MetricsInterface = require('../../lib/metrics/metrics-interface')
const Metrics = require('../../lib/metrics/metrics')
const EventEmitter = require('events')

class DummyMetricsProvider extends MetricsInterface {
  constructor () {
    super()
    this.socket = new EventEmitter()
  }

  timing () {}
  gauge () {}
  unique () {}
  set () {}
  increment () {}
  decrement () {}
  histogram () {}
}

describe('metrics', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const provider = this.provider = new DummyMetricsProvider()

    this.metrics = new Metrics({ provider })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.timing() should sends a timing command with the specified milliseconds', function () {
    const providerTimingStub = this.sandbox.stub(this.provider, 'timing')
    const args = [ 'response_time', 42 ]

    this.metrics.timing(...args)

    assert.ok(providerTimingStub.calledWithExactly(...args))
  })

  it('.gauge() should gauge a stat by a specified amount', function () {
    const providerGaugeStub = this.sandbox.stub(this.provider, 'gauge')
    const args = [ 'rss', 123.45 ]

    this.metrics.gauge(...args)

    assert.ok(providerGaugeStub.calledWithExactly(...args))
  })

  it('.unique() should count unique occurrences of a stat', function () {
    const providerUniqueStub = this.sandbox.stub(this.provider, 'unique')
    const args = [ 'my_unique', 'wadus' ]

    this.metrics.unique(...args)

    assert.ok(providerUniqueStub.calledWithExactly(...args))
  })

  it('.set() should count occurrences of a stat', function () {
    const providerSetStub = this.sandbox.stub(this.provider, 'set')
    const args = [ 'my_set', 'wadus' ]

    this.metrics.set(...args)

    assert.ok(providerSetStub.calledWithExactly(...args))
  })

  it('.increment() should increment a stat given a key', function () {
    const providerIncrementStub = this.sandbox.stub(this.provider, 'increment')
    const args = [ 'home' ]

    this.metrics.increment(...args)

    assert.ok(providerIncrementStub.calledWithExactly(...args))
  })

  it('.decrement() should decrement a stat given a key', function () {
    const providerDecrementStub = this.sandbox.stub(this.provider, 'decrement')
    const args = [ 'home' ]

    this.metrics.decrement(...args)

    assert.ok(providerDecrementStub.calledWithExactly(...args))
  })

  it('.histogram() should add user-defined tags to the data', function () {
    const providerHistogramStub = this.sandbox.stub(this.provider, 'histogram')
    const args = [ 'my_histogram', 42, ['foo', 'bar'] ]

    this.metrics.histogram(...args)

    assert.ok(providerHistogramStub.calledWithExactly(...args))
  })
})
