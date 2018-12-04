const assert = require('assert')
const LoggerFactory = require('../../../../../src/logger')
const MetricsFactory = require('../../../../../src/metrics')
const { RunnerInterface } = require('../../../../../src/interfaces')
const ServerFactory = require('../../../../../src/launcher/cluster/leader')

describe('server-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const server = ServerFactory.create({ metrics, logger })

    assert.ok(server instanceof RunnerInterface)
  })
})
