const Middleware = require('./middleware')

module.exports = class MetricsMiddleware extends Middleware {
  constructor ({ metrics }) {
    super()
    this.metrics = metrics
  }

  middleware () {
    return async (ctx, next) => {
      try {
        await next()
      } catch (err) {
        throw err
      } finally {
        this.metrics.increment('response', ctx.response.status)
      }
    }
  }
}
