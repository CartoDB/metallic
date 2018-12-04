import assert from 'assert'
import { RunnerInterface } from '../../../../../src/interfaces'
import MetricsFactory from '../../../../../src/metrics'
import LoggerFactory from '../../../../../src/logger'
import LeaderFactory from '../../../../../src/launcher/cluster/leader'

describe('leader-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })

    const leader = LeaderFactory.create({ metrics, logger })

    assert.ok(leader instanceof RunnerInterface)
  })
})
