'use strict'

const LoggerInterface = require('./logger-interface')

module.exports = class Logger extends LoggerInterface {
  constructor ({ provider }) {
    super()
    this.provider = provider
  }

  async run () {}

  async close () {}

  reopenFileStreams () {
    this.provider.reopenFileStreams()
  }

  child (requestId) {
    return this.provider.child({ requestId })
  }

  debug () {
    this.provider.debug(...arguments)
  }

  log () {
    this.provider.info(...arguments)
  }

  info () {
    this.provider.info(...arguments)
  }

  warn () {
    this.provider.warn(...arguments)
  }

  error () {
    this.provider.error(...arguments)
  }
}
