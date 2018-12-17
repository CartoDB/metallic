'use strict'

const assert = require('assert')
const sinon = require('sinon')
const ClusterInterface = require('../../../lib/launcher/cluster/cluster-interface')
const LauncherInterface = require('../../../lib/launcher/launcher-interface')
const Launcher = require('../../../lib/launcher/launcher')
const { MetricsInterface } = require('../../../lib/metrics')
const { LoggerInterface } = require('../../../lib/logger')

class Target extends ClusterInterface {
  get role () {
    return 'role'
  }
}

class Metrics extends MetricsInterface {
  async run () {}
  async close () {}
}

class Logger extends LoggerInterface {
  async run () {}
  async close () {}
}

describe('launcher', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const target = this.target = new Target()
    const metrics = this.metrics = new Metrics()
    const logger = this.logger = new Logger()

    this.launcher = new Launcher({ target, metrics, logger })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement a ${LauncherInterface.name}`, function () {
    assert.ok(this.launcher instanceof LauncherInterface)
  })

  it('.role should get target\'s role', function () {
    assert.strictEqual(this.launcher.role, 'role')
  })

  it('.run() should init successfully', async function () {
    const targetRunStub = this.sandbox.stub(this.target, 'run').returns(Promise.resolve())

    await this.launcher.run()

    assert.ok(targetRunStub.calledOnce)
  })

  it('.run() should throw error', async function () {
    const error = new Error('wadus')
    const targetRunStub = this.sandbox.stub(this.target, 'run').returns(Promise.reject(error))

    try {
      await this.launcher.run()
    } catch (err) {
      assert.ok(targetRunStub.calledOnce)
      assert.strictEqual(err, error)
    }
  })

  it('.close() should stop successfully', async function () {
    const targetRunStub = this.sandbox.stub(this.target, 'close').returns(Promise.resolve())

    await this.launcher.close()

    assert.ok(targetRunStub.calledOnce)
  })

  it('.close() should throw error', async function () {
    const error = new Error('wadus')
    const targetCloseStub = this.sandbox.stub(this.target, 'close').returns(Promise.reject(error))

    try {
      await this.launcher.close()
    } catch (err) {
      assert.ok(targetCloseStub.calledOnce)
      assert.strictEqual(err, error)
    }
  })

  it('.exit() should exit successfully', async function () {
    const targetExitStub = this.sandbox.stub(this.target, 'exit').returns(Promise.resolve())

    await this.launcher.exit()

    assert.ok(targetExitStub.calledWithExactly(undefined))
  })

  it('.exit() should throw error', async function () {
    const error = new Error('wadus')
    const targetExitStub = this.sandbox.stub(this.target, 'exit').returns(Promise.reject(error))

    try {
      await this.launcher.exit()
    } catch (err) {
      assert.ok(targetExitStub.calledWithExactly(undefined))
      assert.strictEqual(err, error)
    }
  })

  it('.exit(1) should exit with code 1', async function () {
    const targetExitStub = this.sandbox.stub(this.target, 'exit').returns(Promise.resolve())

    await this.launcher.exit(1)

    assert.ok(targetExitStub.calledWithExactly(1))
  })

  it('.exit(1) should throw error', async function () {
    const error = new Error('wadus')
    const targetExitStub = this.sandbox.stub(this.target, 'exit').returns(Promise.reject(error))

    try {
      await this.launcher.exit(1)
    } catch (err) {
      assert.ok(targetExitStub.calledWithExactly(1))
      assert.strictEqual(err, error)
    }
  })
})
