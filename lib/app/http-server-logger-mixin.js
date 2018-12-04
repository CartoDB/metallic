module.exports = class HttpServerLoggerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ logger }) {
        super(...arguments)
        this.logger = logger
      }

      async run () {
        try {
          const httpServer = await super.run()
          this.logger.info('Server started on port', httpServer.address().port)
          return httpServer
        } catch (err) {
          this.logger.error('Server failed on linstening', err)
          throw err
        }
      }

      async close () {
        try {
          await super.close()
          this.logger.info('Server stopped')
        } catch (err) {
          this.logger.error('Failed on close', err)
          throw err
        }
      }
    }
  }
}
