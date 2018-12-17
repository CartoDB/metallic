'use strict'

const { isMaster } = require('cluster')
const { AbstractClassError } = require('../../errors')

const LEADER = Symbol('leader')
const SERVER = Symbol('server')

class Role {
  constructor () {
    throw new AbstractClassError(Role.name)
  }

  static isLeader (clusterOn) {
    return clusterOn && isMaster
  }

  static isServer (clusterOn) {
    return !this.isLeader(clusterOn)
  }

  static get (clusterOn) {
    return this.isLeader(clusterOn) ? LEADER : SERVER
  }

  static getName (clusterOn) {
    return this.isLeader(clusterOn) ? 'leader' : 'server'
  }
}

Role.LEADER = LEADER
Role.SERVER = SERVER

module.exports = Role
