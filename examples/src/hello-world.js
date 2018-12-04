const Metallic = require('../../lib')
const { SERVER } = Metallic

module.exports = class HelloWorld {
  static create (options) {
    const metallic = new Metallic(options)

    if (metallic.role === SERVER) {
      const body = Buffer.from('Hello World\n')

      metallic.app.use(async (ctx, next) => {
        await next()
        ctx.body = body
      })
    }

    return metallic
  }
}
