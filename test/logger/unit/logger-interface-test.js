'use strict'

const assert = require('assert')
const { LoggerInterface } = require('../../../lib/logger')
const { AbstractClassError, UnimplementedError } = require('../../../lib/errors')

class Logger extends LoggerInterface {}

describe('logger-interface', function () {
  beforeEach(function () {
    this.loggerInterface = new Logger()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new LoggerInterface(), AbstractClassError)
  })

  it('.reopenFileStreams() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.reopenFileStreams(), UnimplementedError)
  })

  it('.debug() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.debug(), UnimplementedError)
  })

  it('.log() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.log(), UnimplementedError)
  })

  it('.info() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.info(), UnimplementedError)
  })

  it('.warn() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.warn(), UnimplementedError)
  })

  it('.error() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerInterface.error(), UnimplementedError)
  })
})
