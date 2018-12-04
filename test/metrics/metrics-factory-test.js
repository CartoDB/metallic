const assert = require('assert')
const MetricsFactory = require('../../src/metrics')
const { MetricsInterface } = MetricsFactory

describe('metrics-factory', function () {
  it('.create() should return a Metrics instance', function () {
    const metrics = MetricsFactory.create()

    assert.ok(metrics instanceof MetricsInterface)
  })

  it('.create() should return undefined instance when disabled', function () {
    const options = { enabled: false }
    const metrics = MetricsFactory.create({ options })

    assert.ok(metrics === undefined)
  })
})
