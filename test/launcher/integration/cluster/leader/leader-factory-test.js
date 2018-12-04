const assert = require('assert')
const { RunnerInterface } = require('../../../../../lib/interfaces')
const MetricsFactory = require('../../../../../lib/metrics')
const LoggerFactory = require('../../../../../lib/logger')
const LeaderFactory = require('../../../../../lib/launcher/cluster/leader')

describe('leader-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })

    const leader = LeaderFactory.create({ metrics, logger })

    assert.ok(leader instanceof RunnerInterface)
  })
})
