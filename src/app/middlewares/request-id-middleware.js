const Middleware = require('./middleware')
const uuid = require('node-uuid')

module.exports = class RequestIdMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      try {
        ctx.state.requestId = ctx.get('x-request-id') || uuid.v4()
        await next()
      } catch (err) {
        throw err
      } finally {
        ctx.set('X-Request-ID', ctx.state.requestId)
      }
    }
  }
}
