'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require('../../../lib/logger/logger-interface')
const DummyLogger = require('../support/dummy-logger')
const LoggerSighupListenerMixin = require('../../../lib/logger/logger-sighup-listener-mixin')
const SighupListener = require('../../../lib/logger/sighup-listener')
const { ParentClassError } = require('../../../lib/errors')

describe('logger-sighup-listener-mixin', function () {
  beforeEach(function () {
    const EventedLogger = LoggerSighupListenerMixin.mix(DummyLogger)

    this.sandbox = sinon.createSandbox()

    this.emitter = new EventEmitter()
    this.sighupListener = new SighupListener(this.emitter)
    this.provider = new DummyLogger()

    this.logger = new EventedLogger({
      sighupListener: this.sighupListener,
      provider: this.provider
    })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${LoggerInterface.name}`, function () {
    assert.ok(this.logger instanceof LoggerInterface)
  })

  it('should reopen file streams when message event is emitted', async function () {
    const loggerReopenFileStreamSpy = this.sandbox.spy(this.logger, 'reopenFileStreams')

    await this.logger.run()
    this.emitter.emit('SIGHUP')
    await this.logger.close()

    assert.ok(loggerReopenFileStreamSpy.calledOnce)
  })

  it('should throw ParentClassError when listener is not an instance of ListenerInterface', async function () {
    class InvalidDummyListener {}
    const EventedLogger = LoggerSighupListenerMixin.mix(DummyLogger)
    const sighupListener = new InvalidDummyListener()
    const provider = new DummyLogger()

    assert.throws(() => new EventedLogger({ sighupListener, provider }), ParentClassError)
  })
})
