import assert from 'assert'
import LoggerFactory, { LoggerInterface } from '../../../src/logger'

describe('logger-factory', function () {
  it('.create() should return a Logger instance', function () {
    const logger = LoggerFactory.create()

    assert.ok(logger instanceof LoggerInterface)
  })

  it('.create() should return "undefined" when disabled', function () {
    const options = {
      enabled: false
    }
    const logger = LoggerFactory.create({ options })

    assert.ok(logger === undefined)
  })
})
