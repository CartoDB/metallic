'use strict'

const { ListenerAbstract } = require('../listeners')

module.exports = class ErrorListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'error')
  }
}
