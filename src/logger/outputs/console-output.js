const LoggerOutputInterface = require('./logger-output-interface')

module.exports = class ConsoleOutput extends LoggerOutputInterface {
  constructor (enabled = false) {
    super()
    this.level = 'debug'
    this.stream = process.stdout
    this.enabled = enabled
  }

  isAvailable () {
    return this.enabled
  }
}
