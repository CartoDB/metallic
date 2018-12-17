'use strict'

const assert = require('assert')
const sinon = require('sinon')
const AppMiddlewares = require('../../../lib/app/middlewares/app-middlewares')
const MiddlewareInterface = require('../../../lib/app/middlewares/middleware-interface')

class Middleware extends MiddlewareInterface {
  regist () {}
}

describe('logger-outputs', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()
    this.appMiddlewares = new AppMiddlewares()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('should be an instance of Set', function () {
    assert.ok(this.appMiddlewares instanceof Set)
  })

  it('.add() should add one middleware', function () {
    const middleware = new Middleware()

    this.appMiddlewares.add(middleware)

    assert.strictEqual(this.appMiddlewares.size, 1)
  })

  it('.add() twice the same middleware should just add once', function () {
    const middleware = new Middleware()

    this.appMiddlewares.add(middleware)
    this.appMiddlewares.add(middleware)

    assert.strictEqual(this.appMiddlewares.size, 1)
  })

  it('.add() should throw error if element to add is not a middleware', function () {
    const notMiddleware = {}

    assert.throws(() => this.appMiddlewares.add(notMiddleware), 'Middleware must be a MiddlewareInterface instance')
  })

  it('.regist() should call .regist() of every middleware', function () {
    const middleware = new Middleware()
    middleware.regist = this.sandbox.spy()

    this.appMiddlewares.add(middleware)

    this.appMiddlewares.regist()

    assert.ok(middleware.regist.calledOnce)
  })
})
