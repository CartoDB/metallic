'use strict'

const assert = require('assert')
const MiddlewareInterface = require('../../../lib/app/middlewares/middleware-interface')
const { AbstractClassError, UnimplementedError } = require('../../../lib/errors')

class Middleware extends MiddlewareInterface {}

describe('middleware-interface', function () {
  beforeEach(function () {
    this.middleware = new Middleware()
  })

  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new MiddlewareInterface(), AbstractClassError)
  })

  it('.regist() should throw "Unimplemented method" error', function () {
    assert.throws(() => this.middleware.regist(), UnimplementedError)
  })
})
