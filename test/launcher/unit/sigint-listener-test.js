'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const { ListenerInterface } = require('../../../lib/listeners')
const SigintListener = require('../../../lib/launcher/sigint-listener')

describe('sigint-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    this.sigintListener = new SigintListener({ emitter })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement a ${ListenerInterface.name}`, function () {
    assert.ok(this.sigintListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to SIGINT emitter', function () {
    const listenerSpy = this.sandbox.spy()

    this.sigintListener.listen(listenerSpy)
    this.emitter.emit('SIGINT')

    assert.ok(listenerSpy.calledOnce)
  })
})
