import assert from 'assert'
import sinon from 'sinon'
import { RunnerInterface } from '../../src/interfaces'
import HttpServerLoggerMixin from '../../src/app/http-server-logger-mixin'
import { LoggerInterface } from 'metallic-logger'

class Logger extends LoggerInterface {}
class DummyHttpServer extends RunnerInterface {
  async run () {
    return {
      address: function () {
        return { port: 0 }
      }
    }
  }
  async close () {}
}

describe('http-server-logger-mixin', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    const LoggedHttpServer = HttpServerLoggerMixin.mix(DummyHttpServer)

    const logger = this.logger = new Logger()
    this.httpServer = new LoggedHttpServer({ logger })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement a ${HttpServerLoggerMixin.name}`, function () {
    assert.ok(this.httpServer instanceof RunnerInterface)
  })

  it('.run() should log when ready', async function () {
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    await this.httpServer.run()

    assert.ok(loggerInfoStub.calledOnce)
  })

  it('.run() should log error when fails', async function () {
    const error = new Error('wadus')
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info').throws(error)
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    try {
      await this.httpServer.run()
    } catch (err) {
      assert.equal(error, err)
      assert.ok(loggerInfoStub.calledOnce)
      assert.ok(loggerErrorStub.calledOnce)
    }
  })

  it('.close() should log when closed', async function () {
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info')

    await this.httpServer.close()

    assert.ok(loggerInfoStub.calledOnce)
  })

  it('.close() should log error when fails', async function () {
    const error = new Error('wadus')
    const loggerInfoStub = this.sandbox.stub(this.logger, 'info').throws(error)
    const loggerErrorStub = this.sandbox.stub(this.logger, 'error')

    try {
      await this.httpServer.close()
    } catch (err) {
      assert.equal(error, err)
      assert.ok(loggerInfoStub.calledOnce)
      assert.ok(loggerErrorStub.calledOnce)
    }
  })
})
