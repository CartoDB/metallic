'use strict'

const { AbstractClassError } = require('../errors')
const { RunnerInterface } = require('../interfaces')

module.exports = class LauncherInterface extends RunnerInterface {
  constructor () {
    if (new.target === LauncherInterface) {
      throw new AbstractClassError(LauncherInterface.name)
    }
    super()
  }
}
