import LoggerInterface from '../../../src/logger/logger-interface'

export default class DummyLogger extends LoggerInterface {
  async run () {}
  async close () {}
  reopenFileStreams () {}
  debug () {}
  log () {}
  info () {}
  warn () {}
  error () {}
}
