const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LauncherInterface = require('../../../src/launcher/launcher-interface')
const DummyLauncher = require('../support/dummy-launcher')
const LauncherExitSignalListenerMixin = require('../../../src/launcher/launcher-exit-signal-listener-mixin')
const SigintListener = require('../../../src/launcher/sigint-listener')

describe('launcher-exit-signal-listener-mixin', function () {
  beforeEach(function () {
    const EventedLauncher = LauncherExitSignalListenerMixin.mix(DummyLauncher)

    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    const exitSignalListeners = this.exitSignalListeners = new SigintListener({ emitter })

    this.launcher = new EventedLauncher({ exitSignalListeners })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${LauncherInterface.name}`, function () {
    assert.ok(this.launcher instanceof LauncherInterface)
  })

  it('.run() should attach listener', async function () {
    const exitSignalListenersListenSpy = this.sandbox.spy(this.exitSignalListeners, 'listen')

    await this.launcher.run()

    assert.ok(exitSignalListenersListenSpy.calledOnce)
  })

  it('should exit when exit signal has been emitted', async function () {
    const error = new Error('wadus')
    const launcherExitSpy = this.sandbox.spy(this.launcher, 'exit')

    await this.launcher.run()
    this.emitter.emit('SIGINT', error)
    await new Promise(resolve => resolve())

    assert.ok(launcherExitSpy.calledOnce)
  })

  it('.close() should remove listener', async function () {
    const exitSignalListenersRemoveStub = this.sandbox.stub(this.exitSignalListeners, 'remove')

    await this.launcher.run()
    await this.launcher.close()

    assert.ok(exitSignalListenersRemoveStub.calledOnce)
  })

  it('.exit() should remove listener', async function () {
    const exitSignalListenersRemoveStub = this.sandbox.stub(this.exitSignalListeners, 'remove')

    await this.launcher.run()
    await this.launcher.exit()

    assert.ok(exitSignalListenersRemoveStub.calledOnce)
  })
})
