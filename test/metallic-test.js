import assert from 'assert'
import Metallic, { SERVER } from '../src'

describe('metallic', function () {
  describe('OOP API', function () {
    beforeEach(function () {
      this.metallic = new Metallic({ port: 0 })
    })

    it('.start() should init the service', async function () {
      assert.doesNotThrow(async () => {
        await this.metallic.start()
        await this.metallic.stop()
      })
    })

    it('.stop() should close the service', function () {
      assert.doesNotThrow(async () => {
        await this.metallic.start()
        await this.metallic.stop()
      })
    })

    it(`.role should return server`, function () {
      assert.equal(this.metallic.role, SERVER)
    })

    it('.logger should return a logger provider', function () {
      assert.doesNotThrow(() => this.metallic.logger.debug())
      assert.doesNotThrow(() => this.metallic.logger.info())
      assert.doesNotThrow(() => this.metallic.logger.warn())
      assert.doesNotThrow(() => this.metallic.logger.error())
    })

    it('.metrics should return a metrics instance', function () {
      assert.doesNotThrow(() => this.metallic.metrics.timing())
      assert.doesNotThrow(() => this.metallic.metrics.gauge())
      assert.doesNotThrow(() => this.metallic.metrics.increment())
    })
  })

  describe('FP API', function () {
    beforeEach(function () {
      const { app, role, logger, metrics, start, stop } = new Metallic({ port: 0 })
      this.app = app
      this.role = role
      this.logger = logger
      this.metrics = metrics
      this.start = start
      this.stop = stop
    })

    it('.run() should init the service', async function () {
      assert.doesNotThrow(async () => {
        await this.start()
        await this.stop()
      })
    })

    it('.close() should close the service', function () {
      assert.doesNotThrow(async () => {
        await this.start()
        await this.stop()
      })
    })

    it(`.role should return server`, function () {
      assert.equal(this.role, SERVER)
    })

    it('.logger should return a logger provider', function () {
      assert.doesNotThrow(() => this.logger.debug())
      assert.doesNotThrow(() => this.logger.info())
      assert.doesNotThrow(() => this.logger.warn())
      assert.doesNotThrow(() => this.logger.error())
    })

    it('.metrics should return a metrics instance', function () {
      assert.doesNotThrow(() => this.metrics.timing())
      assert.doesNotThrow(() => this.metrics.gauge())
      assert.doesNotThrow(() => this.metrics.increment())
    })
  })
})
