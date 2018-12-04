const { AbstractClassError, UnimplementedError } = require('../../errors')

module.exports = class LoggerOutputInterface {
  constructor () {
    if (new.target === LoggerOutputInterface) {
      throw new AbstractClassError(LoggerOutputInterface.name)
    }
  }

  isAvailable () {
    throw new UnimplementedError()
  }
}
