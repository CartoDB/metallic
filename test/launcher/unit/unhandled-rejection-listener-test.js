const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const { LoggerInterface } = require('../../../lib/logger')
const { ListenerInterface } = require('../../../lib/listeners')
const UnhandledRejectionListener = require('../../../lib/launcher/unhandled-rejection-listener')

class Logger extends LoggerInterface {}

describe('unhandled-rejection-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    const logger = this.logger = new Logger()
    this.unhandledRejectionListener = new UnhandledRejectionListener({ emitter, logger })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${ListenerInterface.name}`, function () {
    assert.ok(this.unhandledRejectionListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to unhandledRejection to emitter', function () {
    const handlerSpy = this.sandbox.spy()
    const error = new Error('wadus error')

    this.unhandledRejectionListener.listen(handlerSpy)
    this.emitter.emit('unhandledRejection', error)

    assert.ok(handlerSpy.withArgs(error).calledOnce)
  })
})
