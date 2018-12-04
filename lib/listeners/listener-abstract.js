const ListenerInterface = require('./listener-interface')
const { AbstractClassError } = require('../errors')

module.exports = class ListenerAbstract extends ListenerInterface {
  constructor (emitter, event) {
    if (new.target === ListenerAbstract) {
      throw new AbstractClassError(ListenerAbstract.name)
    }
    super()
    this.emitter = emitter
    this.event = event
  }

  listen (handler) {
    this.handler = handler
    this.emitter.on(this.event, this.handler)
  }

  remove () {
    this.emitter.removeListener(this.event, this.handler)
  }
}
