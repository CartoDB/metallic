'use strict'

const assert = require('assert')
const LoggerFactory = require('../../../../../lib/logger')
const MetricsFactory = require('../../../../../lib/metrics')
const { RunnerInterface } = require('../../../../../lib/interfaces')
const ServerFactory = require('../../../../../lib/launcher/cluster/leader')

describe('server-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const server = ServerFactory.create({ metrics, logger })

    assert.ok(server instanceof RunnerInterface)
  })
})
