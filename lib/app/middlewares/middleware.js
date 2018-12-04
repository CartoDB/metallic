const MiddlewareInterface = require('./middleware-interface')

module.exports = class Middleware extends MiddlewareInterface {
  constructor () {
    super()
    this.name = new.target.name
  }

  regist (app) {
    const middleware = this.middleware()
    middleware._name = this.name // debugging purposes
    app.use(middleware)
  }
}
