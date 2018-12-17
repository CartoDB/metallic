'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LauncherInterface = require('../../../lib/launcher/launcher-interface')
const DummyLauncher = require('../support/dummy-launcher')
const LauncherUncaughtExceptionListenerMixin = require('../../../lib/launcher/launcher-uncaught-exception-listener-mixin')
const UncaughtExceptionListener = require('../../../lib/launcher/uncaught-exception-listener')

describe('launcher-uncaught-exception-listener-mixin', function () {
  beforeEach(function () {
    const EventedLauncher = LauncherUncaughtExceptionListenerMixin.mix(DummyLauncher)

    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    const uncaughtExceptionListeners = this.uncaughtExceptionListeners = new UncaughtExceptionListener({ emitter })

    this.launcher = new EventedLauncher({ uncaughtExceptionListeners })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${LauncherInterface.name}`, function () {
    assert.ok(this.launcher instanceof LauncherInterface)
  })

  it('.run() should attach listener', async function () {
    const uncaughtExceptionListenersListenSpy = this.sandbox.spy(this.uncaughtExceptionListeners, 'listen')

    await this.launcher.run()

    assert.ok(uncaughtExceptionListenersListenSpy.calledOnce)
  })

  it('should exit when uncaughtException has been emitted', async function () {
    const error = new Error('wadus')
    const launcherExitSpy = this.sandbox.spy(this.launcher, 'exit')

    await this.launcher.run()
    this.emitter.emit('uncaughtException', error)
    await new Promise(resolve => resolve())

    assert.ok(launcherExitSpy.calledOnce)
  })

  it('.close() should remove listener', async function () {
    const uncaughtExceptionListenersRemoveStub = this.sandbox.stub(this.uncaughtExceptionListeners, 'remove')

    await this.launcher.run()
    await this.launcher.close()

    assert.ok(uncaughtExceptionListenersRemoveStub.calledOnce)
  })

  it('.exit() should remove listener', async function () {
    const uncaughtExceptionListenersRemoveStub = this.sandbox.stub(this.uncaughtExceptionListeners, 'remove')

    await this.launcher.run()
    await this.launcher.exit()

    assert.ok(uncaughtExceptionListenersRemoveStub.calledOnce)
  })
})
