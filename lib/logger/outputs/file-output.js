'use strict'

const LoggerOutputInterface = require('./logger-output-interface')

module.exports = class FileOutput extends LoggerOutputInterface {
  constructor (enabled = false, path) {
    super()
    this.level = 'info'
    this.enabled = enabled
    this.path = path
  }

  isAvailable () {
    return this.enabled
  }
}
