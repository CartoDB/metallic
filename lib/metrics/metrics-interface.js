'use strict'

const { AbstractClassError, UnimplementedError } = require('../errors')
const { RunnerInterface } = require('../interfaces')

module.exports = class MetricsInterface extends RunnerInterface {
  constructor () {
    if (new.target === MetricsInterface) {
      throw new AbstractClassError(MetricsInterface.name)
    }
    super()
  }

  timing () {
    throw new UnimplementedError()
  }

  gauge () {
    throw new UnimplementedError()
  }

  unique () {
    throw new UnimplementedError()
  }

  set () {
    throw new UnimplementedError()
  }

  increment () {
    throw new UnimplementedError()
  }

  decrement () {
    throw new UnimplementedError()
  }

  histogram () {
    throw new UnimplementedError()
  }
}
