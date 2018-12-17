'use strict'

const assert = require('assert')
const sinon = require('sinon')
const LauncherInterface = require('../../../lib/launcher/launcher-interface')
const DummyLauncher = require('../support/dummy-launcher')
const LauncherExitOnErrorMixin = require('../../../lib/launcher/launcher-exit-on-error-mixin')

class FaultyLauncher extends DummyLauncher {
  run () {
    throw new Error('Ooops')
  }
}

describe('launcher-exit-on-error-mixin', function () {
  beforeEach(function () {
    const ExitOnErrorLauncher = LauncherExitOnErrorMixin.mix(FaultyLauncher)

    this.sandbox = sinon.createSandbox()

    this.launcher = new ExitOnErrorLauncher()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${LauncherInterface.name}`, function () {
    assert.ok(this.launcher instanceof LauncherInterface)
  })

  it('.run() should attach listener', async function () {
    const launcherExitSpy = this.sandbox.spy(this.launcher, 'exit')

    await this.launcher.run()

    assert.ok(launcherExitSpy.calledWithExactly(1))
  })
})
