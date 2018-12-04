import Middleware from './middleware'

export default class RequestIdMiddleware extends Middleware {
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
