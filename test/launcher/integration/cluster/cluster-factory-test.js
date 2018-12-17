'use strict'

const assert = require('assert')
const LoggerFactory = require('../../../../lib/logger')
const MetricsFactory = require('../../../../lib/metrics')
const HttpServerFactory = require('../../../../lib/app')
const { RunnerInterface } = require('../../../../lib/interfaces')
const ClusterFactory = require('../../../../lib/launcher/cluster')

describe('cluster-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const httpServer = HttpServerFactory.create({ logger, metrics })
    const cluster = ClusterFactory.create({ httpServer, metrics, logger })

    assert.ok(cluster instanceof RunnerInterface)
  })
})
