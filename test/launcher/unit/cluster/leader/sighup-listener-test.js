'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const SighupListener = require('../../../../../lib/launcher/cluster/leader/sighup-listener')

describe('sigterm-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    this.sighupListener = new SighupListener({ emitter })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGTERM process event', function () {
    const listenerStub = this.sandbox.stub().returns(Promise.resolve())

    this.sighupListener.listen(listenerStub)
    this.emitter.emit('SIGHUP')

    assert.ok(listenerStub.calledOnce)
  })
})
