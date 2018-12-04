import assert from 'assert'
import sinon from 'sinon'
import EventEmitter from 'events'
import { ListenerInterface } from '../../../src/listeners'
import LogCommandListener from '../../../src/logger/log-command-listener'

describe('log-command-listener', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    this.emitter = new EventEmitter()
    this.logCommandListener = new LogCommandListener(this.emitter)
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be an instace of ListenerInterface', function () {
    assert.ok(this.logCommandListener instanceof ListenerInterface)
  })

  it('.listen() should attach listener to message emitter', function () {
    const reopenFileStreamsSpy = this.sandbox.spy()
    const msg = 'logger:reopen-file-streams'

    this.logCommandListener.listen(reopenFileStreamsSpy)
    this.emitter.emit('message', msg)

    assert.ok(reopenFileStreamsSpy.withArgs(msg).calledOnce)
  })
})
