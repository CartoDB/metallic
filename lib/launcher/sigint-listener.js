'use strict'

const { ListenerAbstract } = require('../listeners')

module.exports = class SigintListener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'SIGINT')
  }
}
