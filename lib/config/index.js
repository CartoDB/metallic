const parseArguments = require('./argv/parse')
const { Role } = require('../launcher')
const defaults = require('./defaults')

module.exports = function config (clientOptions = {}) {
  const argumentOptions = parseArguments(clientOptions.arguments)
  const options = { ...defaults, ...clientOptions, ...argumentOptions }
  options.cluster.role = Role.getName(options.cluster.enabled)

  return options
}
