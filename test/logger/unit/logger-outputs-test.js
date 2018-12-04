const assert = require('assert')
const LoggerOutputs = require('../../../lib/logger/outputs/logger-outputs')
const LoggerOutputInterface = require('../../../lib/logger/outputs/logger-output-interface')

class LoggerOutput extends LoggerOutputInterface {
  constructor (available = true) {
    super()
    this.available = available
  }

  isAvailable () {
    return this.available
  }
}

describe('logger-outputs', function () {
  beforeEach(function () {
    this.loggerOutputs = new LoggerOutputs()
  })

  it('should be an instance of Set', function () {
    assert.ok(this.loggerOutputs instanceof Set)
  })

  it('.add() should add one output', function () {
    const loggerOutput = new LoggerOutput()

    this.loggerOutputs.add(loggerOutput)

    assert.strictEqual(this.loggerOutputs.size, 1)
  })

  it('.add() should not add output when it is not available', function () {
    const available = false
    const loggerOutput = new LoggerOutput(available)

    this.loggerOutputs.add(loggerOutput)

    assert.strictEqual(this.loggerOutputs.size, 0)
  })

  it('.add() twice the same logger-output should just add once', function () {
    const loggerOutput = new LoggerOutput()

    this.loggerOutputs.add(loggerOutput)
    this.loggerOutputs.add(loggerOutput)

    assert.strictEqual(this.loggerOutputs.size, 1)
  })

  it('.add() should throw error if element to add is not a logger output', function () {
    const notAloggerOutput = {}

    assert.throws(() => this.loggerOutputs.add(notAloggerOutput), 'LoggerOutput must be a LoggerOutputInterface instance')
  })

  it('.toArray() should return an array of logger-outputs', function () {
    const loggerOutput = new LoggerOutput()

    this.loggerOutputs.add(loggerOutput)

    assert.ok(Array.isArray(this.loggerOutputs.toArray()))
    assert.strictEqual(this.loggerOutputs.toArray().length, 1)
  })
})
