import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import { LoggerInterface } from '../../../src/logger'
import { ListenerInterface } from '../../../src/listeners'
import UnhandledRejectionListener from '../../../src/launcher/unhandled-rejection-listener'

class Logger extends LoggerInterface {}

describe('unhandled-rejection-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    const emitter = this.emitter = new EventEmitter()
    const logger = this.logger = new Logger()
    this.unhandledRejectionListener = new UnhandledRejectionListener({ emitter, logger })
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it(`should implement ${ListenerInterface.name}`, function () {
    assert.ok(this.unhandledRejectionListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to unhandledRejection to emitter', function () {
    const handlerSpy = this.sandbox.spy()
    const error = new Error('wadus error')

    this.unhandledRejectionListener.listen(handlerSpy)
    this.emitter.emit('unhandledRejection', error)

    assert.ok(handlerSpy.withArgs(error).calledOnce)
  })
})
