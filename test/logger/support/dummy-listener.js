const { ListenerAbstract } = require('../../../lib/listeners')

module.exports = class DummyListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'message')
    this.command = 'wadus'
  }
}
