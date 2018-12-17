'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LoggerInterface = require('../../../lib/logger/logger-interface')
const DummyLogger = require('../support/dummy-logger')
const LoggerLogCommandListenerMixin = require('../../../lib/logger/logger-log-command-listener-mixin')
const LogCommandListener = require('../../../lib/logger/log-command-listener')
const { ParentClassError } = require('../../../lib/errors')

describe('logger-log-command-listener-mixin', function () {
  beforeEach(function () {
    const EventedLogger = LoggerLogCommandListenerMixin.mix(DummyLogger)

    this.sandbox = sinon.createSandbox()

    this.emitter = new EventEmitter()
    this.logCommandListener = new LogCommandListener(this.emitter)
    this.provider = new DummyLogger()

    this.logger = new EventedLogger({
      logCommandListener: this.logCommandListener,
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
    this.emitter.emit('message', 'logger:reopen-file-streams')
    await this.logger.close()

    assert.ok(loggerReopenFileStreamSpy.calledOnce)
  })

  it('should not reopen streams when event is emitted witn another command', async function () {
    const loggerReopenFileStreamSpy = this.sandbox.spy(this.logger, 'reopenFileStreams')

    await this.logger.run()
    this.emitter.emit('message', 'wadus')
    await this.logger.close()

    assert.ok(loggerReopenFileStreamSpy.notCalled)
  })

  it('should throw ParentClassError when listener is not an instance of ListenerInterface', async function () {
    class InvalidDummyListener {}
    const EventedLogger = LoggerLogCommandListenerMixin.mix(DummyLogger)
    const logCommandListener = new InvalidDummyListener()
    const provider = new DummyLogger()

    assert.throws(() => new EventedLogger({ logCommandListener, provider }), ParentClassError)
  })
})
