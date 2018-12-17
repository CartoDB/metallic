'use strict'

const assert = require('assert')
const LeaderInterface = require('../../../../../lib/launcher/cluster/leader/leader-interface')
const { AbstractClassError, UnimplementedError } = require('../../../../../lib/errors')

class Leader extends LeaderInterface {}

describe('leader-interface', function () {
  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new LeaderInterface(), AbstractClassError)
  })

  it('.refork() should throw "Unimplemented method" error', function () {
    const leader = new Leader()
    try {
      leader.refork()
    } catch (err) {
      assert.ok(err instanceof UnimplementedError)
    }
  })

  it('.reboot() should throw "Unimplemented method" error', async function () {
    const leader = new Leader()
    try {
      await leader.reboot()
    } catch (err) {
      assert.ok(err instanceof UnimplementedError)
    }
  })

  it('.rotateLog() should throw "Unimplemented method" error', async function () {
    const leader = new Leader()
    try {
      await leader.rotateLog()
    } catch (err) {
      assert.ok(err instanceof UnimplementedError)
    }
  })
})
