const LoggerInterface = require('../../../src/logger/logger-interface')

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
