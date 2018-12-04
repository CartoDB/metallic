const assert = require('assert')
const { ListenerInterface } = require('../../src/listeners')
const { UnimplementedMethod } = require('../../src/errors')

class Listener extends ListenerInterface {}

describe('listener-interface', function () {
  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new ListenerInterface(), /ListenerInterface cannot be directly constructed/)
  })

  it('.listen() should throw "Unimplemented method" error', function () {
    const listenerInterface = new Listener()

    assert.throws(() => listenerInterface.listen(), UnimplementedMethod)
  })
})
