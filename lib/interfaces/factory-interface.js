'use strict'

const { AbstractClassError, UnimplementedError } = require('../errors')

module.exports = class FactoryInterface {
  constructor () {
    if (new.target === FactoryInterface) {
      throw new AbstractClassError(FactoryInterface.name)
    }
  }

  static create () {
    throw new UnimplementedError()
  }
}
