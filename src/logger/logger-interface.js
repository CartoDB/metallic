const { AbstractClassError, UnimplementedError } = require('../errors')
const { RunnerInterface } = require('../interfaces')

module.exports = class LoggerInterface extends RunnerInterface {
  constructor () {
    if (new.target === LoggerInterface) {
      throw new AbstractClassError(LoggerInterface.name)
    }
    super()
  }

  reopenFileStreams () {
    throw new UnimplementedError()
  }

  debug () {
    throw new UnimplementedError()
  }

  log () {
    throw new UnimplementedError()
  }

  info () {
    throw new UnimplementedError()
  }

  warn () {
    throw new UnimplementedError()
  }

  error () {
    throw new UnimplementedError()
  }
}
