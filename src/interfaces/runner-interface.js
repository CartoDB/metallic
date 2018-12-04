const { AbstractClassError, UnimplementedError } = require('../errors')

module.exports = class RunnerInterface {
  constructor () {
    if (new.target === RunnerInterface) {
      throw new AbstractClassError(RunnerInterface.name)
    }
  }

  run () {
    throw new UnimplementedError()
  }

  close () {
    throw new UnimplementedError()
  }

  exit () {
    throw new UnimplementedError()
  }
}
