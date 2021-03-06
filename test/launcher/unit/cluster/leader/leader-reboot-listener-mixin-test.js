'use strict'

const assert = require('assert')
const sinon = require('sinon')
const EventEmitter = require('events')
const LeaderInterface = require('../../../../../lib/launcher/cluster/leader/leader-interface')
const DummyLeader = require('../../../support/dummy-leader')
const LeaderRebootListenerMixin = require('../../../../../lib/launcher/cluster/leader/leader-reboot-listener-mixin')
const SighupListener = require('../../../../../lib/launcher/cluster/leader/sighup-listener')
const cluster = require('cluster')

describe('leader-exit-signal-listener-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const Leader = LeaderRebootListenerMixin.mix(DummyLeader)

    const emitter = this.emitter = new EventEmitter()
    const sighupListeners = new SighupListener({ emitter })
    this.sighupListeners = sighupListeners

    const serverPoolSize = 2

    this.leader = new Leader({ sighupListeners, cluster, serverPoolSize })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${LeaderInterface.name}`, function () {
    assert.ok(this.leader instanceof LeaderInterface)
  })

  it('.run() should attach listener', async function () {
    const sighupListenersListenSpy = this.sandbox.spy(this.sighupListeners, 'listen')

    await this.leader.run()

    assert.ok(sighupListenersListenSpy.calledOnce)
  })

  it('should reboot when sighup has been emitted', async function () {
    const launcherRebootSpy = this.sandbox.spy(this.leader, 'reboot')

    await this.leader.run()
    this.emitter.emit('SIGHUP')
    await new Promise(resolve => resolve())

    assert.ok(launcherRebootSpy.calledOnce)
  })

  it('.close() should remove listener', async function () {
    const sighupListenersRemoveStub = this.sandbox.stub(this.sighupListeners, 'remove')

    await this.leader.run()
    await this.leader.close()

    assert.ok(sighupListenersRemoveStub.calledOnce)
  })

  it('.exit() should remove listener', async function () {
    const sighupListenersRemoveStub = this.sandbox.stub(this.sighupListeners, 'remove')

    await this.leader.run()
    await this.leader.exit()

    assert.ok(sighupListenersRemoveStub.calledOnce)
  })
})
