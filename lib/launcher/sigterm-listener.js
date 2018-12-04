const { ListenerAbstract } = require('../listeners')

module.exports = class SigtermListener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'SIGTERM')
  }
}
