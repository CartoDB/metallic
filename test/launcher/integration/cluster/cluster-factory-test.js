const assert = require('assert')
const LoggerFactory = require('../../../../src/logger')
const MetricsFactory = require('../../../../src/metrics')
const HttpServerFactory = require('../../../../src/app')
const { RunnerInterface } = require('../../../../src/interfaces')
const ClusterFactory = require('../../../../src/launcher/cluster')

describe('cluster-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const httpServer = HttpServerFactory.create({ logger, metrics })
    const cluster = ClusterFactory.create({ httpServer, metrics, logger })

    assert.ok(cluster instanceof RunnerInterface)
  })
})
