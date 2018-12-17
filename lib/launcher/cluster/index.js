'use strict'

const ClusterFactory = require('./cluster-factory')
const Role = require('./role')
const { LEADER, SERVER } = Role

ClusterFactory.Role = Role
ClusterFactory.LEADER = LEADER
ClusterFactory.SERVER = SERVER

module.exports = ClusterFactory
