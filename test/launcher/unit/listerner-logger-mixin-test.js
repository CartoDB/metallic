const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const { ListenerInterface, ListenerAbstract } = require('../../../src/listeners')
const { LoggerInterface } = require('../../../src/logger')
const ListenerLoggerMixin = require('../../../src/launcher/listener-logger-mixin')

class Listener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'wadus')
  }
}
class Logger extends LoggerInterface {}

describe('listener-logger-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const logger = this.logger = new Logger()
    const emitter = this.emitter = new EventEmitter()

    const LoggedListener = ListenerLoggerMixin.mix(Listener)

    this.loggedListener = new LoggedListener({ logger, emitter })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement a ${ListenerInterface.name}`, function () {
    assert.ok(this.loggedListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to emitter', function () {
    const loggerDebugStub = this.sandbox.stub(this.logger, 'debug')
    const handlerSpy = this.sandbox.spy()

    this.loggedListener.listen(handlerSpy)

    assert.ok(loggerDebugStub.calledOnce)
  })

  it('should log whenever a event is emitted', function () {
    const loggerDebugStub = this.sandbox.stub(this.logger, 'debug')
    const handlerSpy = this.sandbox.spy()

    this.loggedListener.listen(handlerSpy)

    this.emitter.emit('wadus')
    this.emitter.emit('wadus')

    assert.ok(loggerDebugStub.calledThrice)
  })
})
