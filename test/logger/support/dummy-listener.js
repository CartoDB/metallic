const { ListenerAbstract } = require('../../../src/listeners')

module.exports = class DummyListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'message')
    this.command = 'wadus'
  }
}
