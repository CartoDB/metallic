'use strict'

const { ListenerAbstract } = require('../../../listeners')

module.exports = class Sigusr2Listener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'SIGUSR2')
  }
}
