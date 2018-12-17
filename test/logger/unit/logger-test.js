'use strict'

const assert = require('assert')
const sinon = require('sinon')
const { LoggerInterface } = require('../../../lib/logger')
const Logger = require('../../../lib/logger/logger')

class LoggerProvider extends LoggerInterface {}

describe('logger', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()
    this.provider = new LoggerProvider()
    this.logger = new Logger({
      provider: this.provider
    })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.reopenFileStreams() should reopen file stream', function () {
    this.provider.reopenFileStreams = this.sandbox.spy()

    this.logger.reopenFileStreams()

    assert.ok(this.provider.reopenFileStreams.calledOnce)
  })

  it('.child() should create a sublogger instance', function () {
    this.provider.child = this.sandbox.spy()
    const requestId = 'wadus-identifier'

    this.logger.child(requestId)

    assert.ok(this.provider.child.calledWithExactly({ requestId }))
  })

  it('.debug() should log at debug level', function () {
    this.provider.debug = this.sandbox.spy()
    const args = [ 'debug', 'wadus message' ]

    this.logger.debug(...args)

    assert.ok(this.provider.debug.calledWithExactly(...args))
  })

  it('.log() should log', function () {
    this.provider.info = this.sandbox.spy()
    const args = [ 'info', 'wadus message' ]

    this.logger.log(...args)

    assert.ok(this.provider.info.calledWithExactly(...args))
  })

  it('.info() should log at info level', function () {
    this.provider.info = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.info(...args)

    assert.ok(this.provider.info.calledWithExactly(...args))
  })

  it('.warn() should log at warn level', function () {
    this.provider.warn = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.warn(...args)

    assert.ok(this.provider.warn.calledWithExactly(...args))
  })

  it('.error() should log at error level', function () {
    this.provider.error = this.sandbox.spy()
    const args = [ 'wadus message' ]

    this.logger.error(...args)

    assert.ok(this.provider.error.calledWithExactly(...args))
  })
})
