'use strict'

const { ListenerAbstract } = require('../listeners')

module.exports = class UncaughtExceptionListener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'uncaughtException')
  }
}
