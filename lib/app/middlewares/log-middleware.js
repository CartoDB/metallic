'use strict'

const Middleware = require('./middleware')

module.exports = class LogMiddleware extends Middleware {
  constructor ({ logger }) {
    super()
    this.logger = logger
  }

  middleware () {
    return async (ctx, next) => {
      try {
        ctx.log = this.logger.child(ctx.state.requestId)
        ctx.log.info({ req: ctx.request })
        await next()
      } catch (err) {
        ctx.log.error(err, `Error ${err.status}: ${err.message}`)
        throw err
      } finally {
        ctx.log.info({ res: ctx.response })
      }
    }
  }
}
