import meow from 'meow'
import readPkgUp from 'read-pkg-up'
import helpInfo from './help-info'

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

export default function parseArguments (options = {}) {
  const help = helpInfo(options.help)
  const args = meow({ help, pkg }, meowOptions).flags

  if (args.port) {
    options.port = args.port
  }

  if (typeof args.cluster === 'boolean') {
    options.cluster = { enabled: args.cluster }
  }

  if (args.logger || args.console || args.logPath) {
    options.logger = {}

    if (typeof args.logger === 'boolean') {
      options.logger.enabled = args.logger
    }

    if (typeof args.console === 'boolean') {
      options.logger.console = args.console
    }

    if (args.logPath) {
      options.logger.path = args.logPath
    }
  }

  if (typeof args.metrics === 'boolean') {
    options.metrics = { enabled: args.metrics }
  }

  return options
}
