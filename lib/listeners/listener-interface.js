'use strict'

const { AbstractClassError, UnimplementedError } = require('../errors')

module.exports = class ListenerInterface {
  constructor () {
    if (new.target === ListenerInterface) {
      throw new AbstractClassError(ListenerInterface.name)
    }
  }

  listen () {
    throw new UnimplementedError()
  }

  remove () {
    throw new UnimplementedError()
  }
}
