const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const Sigusr2Listener = require('../../../../../src/launcher/cluster/leader/sigusr2-listener')

describe('sigusr2-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    this.sigusr2Listener = new Sigusr2Listener({ emitter })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should attach listener to SIGUSR2 process event', function () {
    var listenerStub = this.sandbox.stub().returns(Promise.resolve())

    this.sigusr2Listener.listen(listenerStub)
    this.emitter.emit('SIGUSR2')

    assert.ok(listenerStub.calledOnce)
  })
})
