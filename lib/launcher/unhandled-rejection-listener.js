const { ListenerAbstract } = require('../listeners')

module.exports = class UnhandledRejectionListener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'unhandledRejection')
  }
}
