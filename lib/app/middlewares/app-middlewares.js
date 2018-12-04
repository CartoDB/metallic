const MiddlewareInterface = require('./middleware-interface')
const { ParentClassError } = require('../../errors')

module.exports = class AppMiddlewares extends Set {
  add (middleware) {
    if (!(middleware instanceof MiddlewareInterface)) {
      throw new ParentClassError(middleware.constructor.name, MiddlewareInterface.name)
    }

    super.add(middleware)

    return this
  }

  regist (app) {
    for (let middleware of this) {
      middleware.regist(app)
    }
  }
}
