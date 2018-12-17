'use strict'

const { ListenerAbstract } = require('../listeners')

module.exports = class LogCommandListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'message')
    this.command = 'logger:reopen-file-streams'
  }
}
