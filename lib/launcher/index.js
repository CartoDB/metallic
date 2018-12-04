const LauncherFactory = require('./launcher-factory')
const { Role } = require('./cluster')
const { LEADER, SERVER } = Role

LauncherFactory.Role = Role
LauncherFactory.LEADER = LEADER
LauncherFactory.SERVER = SERVER

module.exports = LauncherFactory
