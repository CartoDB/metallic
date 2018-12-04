const assert = require('assert')
const sinon = require('sinon')
const LauncherInterface = require('../../../lib/launcher/launcher-interface')
const DummyLauncher = require('../support/dummy-launcher')
const LauncherLoggerMixin = require('../../../lib/launcher/launcher-logger-mixin')
const { LoggerInterface } = require('../../../lib/logger')

class Logger extends LoggerInterface {}

describe('launcher-logger-mixin', function () {
  beforeEach(function () {
    const LoggedLauncher = LauncherLoggerMixin.mix(DummyLauncher)

    this.sandbox = sinon.createSandbox()
    const logger = this.logger = new Logger()
    this.launcher = new LoggedLauncher({ logger })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement a ${LauncherLoggerMixin.name}`, function () {
    assert.ok(this.launcher instanceof LauncherInterface)
  })

  it('.run() should log when ready', async function () {
    const loggerRunStub = this.sandbox.stub(this.logger, 'run')
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    await this.launcher.run()

    assert.ok(loggerRunStub.calledOnce)
    assert.ok(loggerInfoStub.calledOnce)
  })

  it('.run() should log error when fails', async function () {
    const error = new Error('wadus')
    const loggerRunStub = this.sandbox.stub(this.logger, 'run')
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info').throws(error)
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    try {
      await this.launcher.run()
    } catch (err) {
      assert.strictEqual(error, err)
      assert.ok(loggerRunStub.calledOnce)
      assert.ok(loggerInfoStub.calledOnce)
      assert.ok(loggerErrorStub.calledOnce)
    }
  })

  it('.close() should log when closed', async function () {
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info')
    const loggerCloseStub = this.sandbox.stub(this.logger, 'close')

    await this.launcher.close()

    assert.ok(loggerInfoStub.calledOnce)
    assert.ok(loggerCloseStub.calledOnce)
  })

  it('.close() should log error when fails', async function () {
    const error = new Error('wadus')
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info').throws(error)
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    try {
      await this.launcher.close()
    } catch (err) {
      assert.strictEqual(error, err)
      assert.ok(loggerInfoStub.calledOnce)
      assert.ok(loggerErrorStub.calledOnce)
    }
  })

  it('.exit() should log when exits', function () {
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    this.launcher.exit()

    assert.ok(loggerInfoStub.calledOnce)
  })
})
