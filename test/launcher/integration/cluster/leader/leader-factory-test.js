const assert = require('assert')
const { RunnerInterface } = require('../../../../../src/interfaces')
const MetricsFactory = require('../../../../../src/metrics')
const LoggerFactory = require('../../../../../src/logger')
const LeaderFactory = require('../../../../../src/launcher/cluster/leader')

describe('leader-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })

    const leader = LeaderFactory.create({ metrics, logger })

    assert.ok(leader instanceof RunnerInterface)
  })
})
