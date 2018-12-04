const Middleware = require('./middleware')
const { STATUS_CODES } = require('http')

const DEVELOPMENT = 'development'
const env = process.env.NODE_ENV || DEVELOPMENT

module.exports = class ErrorMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      try {
        await next()

        if (ctx.status === 404 && !ctx.body) {
          ctx.throw(404)
        }
      } catch (err) {
        ctx.status = typeof err.status === 'number' ? err.status : 500

        // accepted types
        switch (ctx.accepts('text', 'json')) {
          case 'text':
            ctx.type = 'text/plain'
            if (env === DEVELOPMENT || err.expose) {
              ctx.body = err.message
            } else {
              ctx.body = STATUS_CODES[ctx.status]
            }
            break

          case 'json':
            ctx.type = 'application/json'
            if (env === DEVELOPMENT || err.expose) {
              ctx.body = { error: err.message }
            } else {
              ctx.body = { error: STATUS_CODES[ctx.status] }
            }
            break
        }

        throw err
      }
    }
  }
}
