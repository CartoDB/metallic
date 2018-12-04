const assert = require('assert')
const LoggerOutputInterface = require('../../../lib/logger/outputs/logger-output-interface')
const { AbstractClassError, UnimplementedError } = require('../../../lib/errors')

class LoggerOutput extends LoggerOutputInterface {}

describe('logger-output-interface', function () {
  beforeEach(function () {
    this.loggerOutputInterface = new LoggerOutput()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new LoggerOutputInterface(), AbstractClassError)
  })

  it('.isAvailable() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.loggerOutputInterface.isAvailable(), UnimplementedError)
  })
})
