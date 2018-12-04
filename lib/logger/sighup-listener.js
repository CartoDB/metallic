const { ListenerAbstract } = require('../listeners')

module.exports = class SighupListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'SIGHUP')
  }
}
