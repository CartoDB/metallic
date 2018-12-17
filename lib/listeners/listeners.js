'use strict'

const { ParentClassError } = require('../errors')
const ListenerInterface = require('./listener-interface')

module.exports = class Listeners extends Set {
  add (listener) {
    if (!(listener instanceof ListenerInterface)) {
      throw new ParentClassError(listener.constructor.name, ListenerInterface.name)
    }

    super.add(listener)

    return this
  }

  listen (handler) {
    for (let listener of this) {
      listener.listen(handler)
    }
  }

  remove () {
    for (let listener of this) {
      listener.remove()
    }
  }
}
