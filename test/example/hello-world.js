'use strict'

const Metallic = require('../../lib')
const { SERVER } = Metallic

module.exports = class HelloWorld {
  static create (options) {
    const metallic = new Metallic(options)

    if (metallic.role === SERVER) {
      const body = Buffer.from('Hello World\n')
      const message = body.toString('utf8')

      metallic.app.use(ctx => {
        ctx.log.info(message)
        ctx.metrics.increment('hello_world')
        ctx.body = body
      })
    }

    return metallic
  }
}
