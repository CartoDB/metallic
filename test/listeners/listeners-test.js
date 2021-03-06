'use strict'

const assert = require('assert')
const sinon = require('sinon')
const { ListenerInterface, Listeners } = require('../../lib/listeners')

class Listener extends ListenerInterface {}

describe('listeners', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    this.listeners = new Listeners()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be an instance of Set', function () {
    assert.ok(this.listeners instanceof Set)
  })

  it('.add() should add one listener', function () {
    const listener = new Listener()

    this.listeners.add(listener)

    assert.strictEqual(this.listeners.size, 1)
  })

  it('.add() twice the same listener should just add once', function () {
    const listener = new Listener()

    this.listeners.add(listener)
    this.listeners.add(listener)

    assert.strictEqual(this.listeners.size, 1)
  })

  it('.add() should throw error if element to add is not a listener', function () {
    const notListener = {}

    assert.throws(() => this.listeners.add(notListener), 'Listener must be a ListenerInterface instance')
  })

  it('.regist() should call .listen() of every listener', function () {
    const listener = new Listener()
    listener.listen = this.sandbox.spy()

    this.listeners.add(listener)

    this.listeners.listen()

    assert.ok(listener.listen.calledOnce)
  })
})
