import assert from 'assert'
import LoggerOutputInterface from '../../../src/logger/outputs/logger-output-interface'
import { AbstractClassError, UnimplementedError } from '../../../src/errors'

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
