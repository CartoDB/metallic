const assert = require('assert')
const MetricsInterface = require('../../lib/metrics/metrics-interface')
const { UnimplementedMethod } = require('../../lib/errors')

class Metrics extends MetricsInterface {}

describe('metrics-interface', function () {
  beforeEach(function () {
    this.metrics = new Metrics()
  })
  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new MetricsInterface(), /MetricsInterface cannot be directly constructed/)
  })

  it('.timing() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.timing(), UnimplementedMethod)
  })

  it('.gauge() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.gauge(), UnimplementedMethod)
  })

  it('.unique() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.unique(), UnimplementedMethod)
  })

  it('.set() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.set(), UnimplementedMethod)
  })

  it('.increment() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.increment(), UnimplementedMethod)
  })

  it('.decrement() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.decrement(), UnimplementedMethod)
  })

  it('.histogram() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.metrics.histogram(), UnimplementedMethod)
  })
})
