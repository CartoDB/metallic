'use strict'

const Middleware = require('./middleware')

module.exports = class RequestIdMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        // do not delegate to koa's error handling
      }
    }
  }
}
