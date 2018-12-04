const { ListenerAbstract } = require('../../../listeners')

module.exports = class ServerExitListener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'exit')
  }
}
