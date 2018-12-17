'use strict'

const LoggerInterface = require('../../../lib/logger/logger-interface')

module.exports = class DummyLogger extends LoggerInterface {
  async run () {}
  async close () {}
  reopenFileStreams () {}
  debug () {}
  log () {}
  info () {}
  warn () {}
  error () {}
}
