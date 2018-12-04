import assert from 'assert'
import LoggerFactory from '../../../../../src/logger'
import MetricsFactory from '../../../../../src/metrics'
import { RunnerInterface } from '../../../../../src/interfaces'
import ServerFactory from '../../../../../src/launcher/cluster/leader'

describe('server-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const server = ServerFactory.create({ metrics, logger })

    assert.ok(server instanceof RunnerInterface)
  })
})
