import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import { ListenerInterface } from 'metallic-listeners'
import { RunnerInterface } from '../../src/interfaces'
import { LoggerInterface } from 'metallic-logger'
import { NotReadyError } from '../../src/errors'
import HttpServer from '../../src/app/http-server'

class Listener extends ListenerInterface {}
class Logger extends LoggerInterface {}

describe('server', function () {
  beforeEach(function () {
    this.sandbox = sinon.sandbox.create()

    const port = this.port = 9876
    const app = this.app = new Listener()
    const logger = this.logger = new Logger()

    this.httpServer = new HttpServer({ app, port, logger })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be a runner instance', function () {
    assert.ok(this.httpServer instanceof RunnerInterface)
  })

  it('.run() should listen on specific port successfully', async function () {
    const port = { port: 0 }
    const httpServerStub = new EventEmitter()
    httpServerStub.address = () => port
    const appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)

    setImmediate(function () {
      httpServerStub.emit('listening')
    }, 10)

    await this.httpServer.run()

    assert.ok(appRunStub.calledOnce)
  })

  it('.run() should fail when app listening fails', async function () {
    const port = { port: 0 }
    const httpServerStub = new EventEmitter()
    httpServerStub.address = () => port
    const appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServerStub)

    setImmediate(() => httpServerStub.emit('error'))

    try {
      await this.httpServer.run()
    } catch (err) {
      assert.ok(appRunStub.calledOnce)
    }
  })

  it('.run() should fail when app is not redy', async function () {
    const appRunStub = this.sandbox.stub(this.app, 'listen').returns(null)

    try {
      await this.httpServer.run()
    } catch (error) {
      assert.ok(error instanceof NotReadyError)
      assert.ok(appRunStub.calledOnce)
    }
  })

  it('.close() should stop even though http-server is not listening', async function () {
    try {
      await this.httpServer.close()
    } catch (error) {
      assert.ifError(error)
    }
  })

  it('.close() should stop successfully when http-server is listening', async function () {
    const port = { port: 0 }
    const httpServer = new EventEmitter()
    httpServer.address = () => port
    httpServer.close = () => {}
    const httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    const appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)

    setImmediate(() => httpServer.emit('listening'))

    await this.httpServer.run()

    assert.ok(appRunStub.calledOnce)

    setImmediate(() => httpServer.emit('close'))

    await this.httpServer.close()

    assert.ok(httpServerStub.calledOnce)
  })

  it('.close() should fail when http-server also fails', async function () {
    const port = { port: 0 }
    const httpServer = new EventEmitter()
    httpServer.address = () => port
    httpServer.close = () => {}
    const httpServerStub = this.sandbox.stub(httpServer, 'close').returns(httpServer)
    const appRunStub = this.sandbox.stub(this.app, 'listen').returns(httpServer)

    setImmediate(() => httpServer.emit('listening'))

    await this.httpServer.run()

    assert.ok(appRunStub.calledOnce)

    setImmediate(() => httpServer.emit('error', new Error('irrelevant')))

    try {
      await this.httpServer.close()
    } catch (err) {
      assert.equal(err.message, 'irrelevant')
      assert.ok(httpServerStub.calledOnce)
    }
  })
})
