'use strict'

const assert = require('assert')
const { RunnerInterface } = require('../../../lib/interfaces')
const LoggerFactory = require('../../../lib/logger')
const MetricsFactory = require('../../../lib/metrics')
const LauncherFactory = require('../../../lib/launcher')
const { Role, LEADER, SERVER } = LauncherFactory

describe('launcher-factory', function () {
  it('.create() should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const launcher = LauncherFactory.create({ metrics, logger })

    assert.ok(launcher instanceof RunnerInterface)
  })

  it('.create() w/o logger should return a Runner instance', function () {
    const logger = LoggerFactory.create()
    const metrics = MetricsFactory.create({ logger })
    const launcher = LauncherFactory.create({ metrics })

    assert.ok(launcher instanceof RunnerInterface)
  })

  it('should export roles', function () {
    assert.ok(typeof LEADER === 'symbol')
    assert.ok(typeof SERVER === 'symbol')
  })

  it('should export Role module', function () {
    assert.ok(typeof Role.getName === 'function')
  })
})
