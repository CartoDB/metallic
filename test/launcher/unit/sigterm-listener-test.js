const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const { ListenerInterface } = require('../../../src/listeners')
const SigtermListener = require('../../../src/launcher/sigterm-listener')

describe('sigterm-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    this.sigtermListener = new SigtermListener({ emitter })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${ListenerInterface.name}`, function () {
    assert.ok(this.sigtermListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to SIGTERM emitter', function () {
    const handlerSpy = this.sandbox.spy()

    this.sigtermListener.listen(handlerSpy)
    this.emitter.emit('SIGTERM')

    assert.ok(handlerSpy.calledOnce)
  })
})
