'use strict'

const assert = require('assert')
const Role = require('../../../../lib/launcher/cluster/role')
const { LEADER, SERVER } = Role

describe('role', function () {
  it('should fail when creates an instance of Role', function () {
    assert.throws(() => new Role())
  })

  it('.isLeader(!clusterOn) should return false', function () {
    const clusterOn = false
    const isLeader = Role.isLeader(clusterOn)

    assert.strictEqual(isLeader, false)
  })

  it('Role.get() should return SERVER', function () {
    const clusterOff = false
    assert.strictEqual(Role.get(clusterOff), SERVER)
  })

  it('Role.get() should return LEADER', function () {
    const clusterOn = true
    assert.strictEqual(Role.get(clusterOn), LEADER)
  })

  it('Role.getName() should return \'server\'', function () {
    const clusterOff = false
    assert.strictEqual(Role.getName(clusterOff), 'server')
  })

  it('Role.getName() should return \'leader\'', function () {
    const clusterOn = true
    assert.strictEqual(Role.getName(clusterOn), 'leader')
  })

  it('create Role directly with "new" should throw error', function () {
    assert.throws(() => new Role(), /Role cannot be directly constructed/)
  })

  it('.isLeader(clusterOn) should return true', function () {
    const clusterOn = true
    const isLeader = Role.isLeader(clusterOn)

    assert.strictEqual(isLeader, true)
  })

  it('.isServer(!clusterOn) should return true', function () {
    const clusterOn = false
    const isServer = Role.isServer(clusterOn)

    assert.strictEqual(isServer, true)
  })

  it('.isServer(clusterOn) should return false', function () {
    const clusterOn = true
    const isServer = Role.isServer(clusterOn)

    assert.strictEqual(isServer, false)
  })
})
