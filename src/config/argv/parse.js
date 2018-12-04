const meow = require('meow')
const readPkgUp = require('read-pkg-up')
const helpInfo = require('./help-info')

const pkg = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
}).pkg

const meowOptions = {
  alias: {
    v: 'version',
    p: 'port',
    c: 'cluster',
    l: 'logger',
    o: 'console',
    m: 'metrics'
  }
}

module.exports = function parseArguments (options = {}) {
  const help = helpInfo(options.help)
  const args = meow({ help, pkg }, meowOptions).flags

  if (args.port) {
    options.port = args.port
  }

  if (typeof args.cluster === 'boolean') {
    options.cluster = { enabled: args.cluster }
  }

  if (typeof args.logger === 'boolean' || typeof args.console === 'boolean' || typeof args.logPath === 'string') {
    options.logger = {}

    if (typeof args.logger === 'boolean') {
      options.logger.enabled = args.logger
    }

    if (typeof args.console === 'boolean') {
      options.logger.console = args.console
    }

    if (typeof args.logPath === 'string') {
      options.logger.path = args.logPath
    }
  }

  if (typeof args.metrics === 'boolean') {
    options.metrics = { enabled: args.metrics }
  }

  return options
}
