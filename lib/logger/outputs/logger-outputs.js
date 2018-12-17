'use strict'

const LoggerOutputInterface = require('./logger-output-interface')
const { ParentClassError } = require('../../errors')

module.exports = class LoggerOutputs extends Set {
  add (output) {
    if (!(output instanceof LoggerOutputInterface)) {
      throw new ParentClassError(output.constructor.name, LoggerOutputInterface.name)
    }

    if (output.isAvailable()) {
      super.add(output)
    }

    return this
  }

  toArray () {
    return Array.from(this.values())
  }
}
