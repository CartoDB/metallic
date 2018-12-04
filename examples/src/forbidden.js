const { STATUS_CODES } = require('http')
const Metallic = require('../../lib')
const { SERVER } = Metallic

module.exports = class Forbidden {
  static create (options) {
    const metallic = new Metallic(options)

    if (metallic.role === SERVER) {
      metallic.app.use(async ctx => ctx.throw(403, STATUS_CODES[403]))
    }

    return metallic
  }
}
