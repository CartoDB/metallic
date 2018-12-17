'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LeaderInterface = require('../../../../../lib/launcher/cluster/leader/leader-interface')
const DummyLeader = require('../../../support/dummy-leader')
const LeaderReforkListenerMixin = require('../../../../../lib/launcher/cluster/leader/leader-refork-listener-mixin')
const ServerExitListener = require('../../../../../lib/launcher/cluster/leader/server-exit-listener')
const cluster = require('cluster')

describe('leader-refork-listener-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const Leader = LeaderReforkListenerMixin.mix(DummyLeader)

    const emitter = this.emitter = new EventEmitter()
    const serverExitListeners = this.serverExitListeners = new ServerExitListener({ emitter })
    const serverPoolSize = this.serverPoolSize = 2

    this.leader = new Leader({ serverExitListeners, cluster, serverPoolSize })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${LeaderInterface.name}`, function () {
    assert.ok(this.leader instanceof LeaderInterface)
  })

  it('.run() should attach listener', async function () {
    const serverExitListenersListenSpy = this.sandbox.spy(this.serverExitListeners, 'listen')

    await this.leader.run()

    assert.ok(serverExitListenersListenSpy.calledOnce)
  })

  it('should refork when exit has been emitted', async function () {
    const launcherReforkSpy = this.sandbox.spy(this.leader, 'refork')

    await this.leader.run()
    this.emitter.emit('exit')
    await new Promise(resolve => resolve())

    assert.ok(launcherReforkSpy.calledOnce)
  })

  it('.close() should remove listener', async function () {
    const serverExitListenersRemoveStub = this.sandbox.stub(this.serverExitListeners, 'remove')

    await this.leader.run()
    await this.leader.close()

    assert.ok(serverExitListenersRemoveStub.calledOnce)
  })

  it('.exit() should remove listener', async function () {
    const serverExitListenersRemoveStub = this.sandbox.stub(this.serverExitListeners, 'remove')

    await this.leader.run()
    await this.leader.exit()

    assert.ok(serverExitListenersRemoveStub.calledOnce)
  })
})
