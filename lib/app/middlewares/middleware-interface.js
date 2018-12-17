'use strict'

const { AbstractClassError, UnimplementedError } = require('../../errors')

module.exports = class MiddlewareInterface {
  constructor () {
    if (new.target === MiddlewareInterface) {
      throw new AbstractClassError(MiddlewareInterface.name)
    }
  }

  regist () {
    throw new UnimplementedError()
  }

  middleware () {
    throw new UnimplementedError()
  }
}
