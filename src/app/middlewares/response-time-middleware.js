import Middleware from './middleware'

export default class ResponseTimeMiddleware extends Middleware {
  middleware () {
    return async (ctx, next) => {
      const start = Date.now()
      try {
        await next()
      } catch (err) {
        throw err
      } finally {
        const delta = Math.ceil(Date.now() - start)
        ctx.set('X-Response-Time', `${delta}ms`)
      }
    }
  }
}
