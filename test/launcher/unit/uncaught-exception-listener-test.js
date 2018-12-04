const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const { ListenerInterface } = require('../../../lib/listeners')
const UncaughtExceptionListener = require('../../../lib/launcher/uncaught-exception-listener')

describe('uncaught-exception-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    this.uncaughtExceptionListener = new UncaughtExceptionListener({ emitter })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${ListenerInterface.name}`, function () {
    assert.ok(this.uncaughtExceptionListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to uncaughtException emitter', function () {
    const handlerSpy = this.sandbox.spy()
    const error = new Error('wadus error')

    this.uncaughtExceptionListener.listen(handlerSpy)
    this.emitter.emit('uncaughtException', error)

    assert.ok(handlerSpy.withArgs(error).calledOnce)
  })
})
