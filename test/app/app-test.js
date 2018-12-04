const assert = require('assert')
const sinon = require('sinon')
const MiddlewareInterface = require('../../src/app/middlewares/middleware-interface')
const App = require('../../src/app/app')

class AppMiddlewares extends MiddlewareInterface {}

describe('app', function () {
  beforeEach(function () {
    this.sandbox = sinon.createSandbox()

    this.provider = {
      use: () => {},
      listen: () => {}
    }
    this.middlewares = new AppMiddlewares()
  })

  afterEach(function () {
    this.sandbox.restore()
  })

  it('.listen() should listen on port 3000', function () {
    this.provider.disable = this.sandbox.spy()
    this.provider.listen = this.sandbox.spy()
    this.middlewares.regist = this.sandbox.spy()

    this.app = new App(this.provider, this.middlewares)
    this.server = this.app.listen(3000)

    assert.ok(this.provider.listen.calledOnce)
    assert.ok(this.middlewares.regist.calledOnce)
  })
})
