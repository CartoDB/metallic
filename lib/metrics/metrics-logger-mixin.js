const { LoggerInterface } = require('../logger')
const { ParentClassError } = require('../errors')

module.exports = class LoggerSighupListenerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ logger }) {
        super(...arguments)

        if (!(logger instanceof LoggerInterface)) {
          throw new ParentClassError(logger.constructor.name, LoggerInterface.name)
        }

        this.logger = logger
      }

      async run () {
        const result = await super.run()
        this.logger.debug('Metrics client started')
        return result
      }

      async close () {
        const result = super.close()
        this.logger.debug('Metrics client stoped')
        return result
      }

      timing () {
        this.logger.debug('Send "timing" command: %s', ...arguments)
        super.timing(...arguments)
      }

      gauge () {
        this.logger.debug('Send "gauge" command: %s', ...arguments)
        super.gauge(...arguments)
      }

      unique () {
        this.logger.debug('Send "unique" command: %s', ...arguments)
        super.unique(...arguments)
      }

      set () {
        this.logger.debug('Send "set" command: %s', ...arguments)
        super.set(...arguments)
      }

      increment () {
        this.logger.debug('Send "increment" command: %s', ...arguments)
        super.increment(...arguments)
      }

      decrement () {
        this.logger.debug('Send "decrement" command: %s', ...arguments)
        super.decrement(...arguments)
      }

      histogram () {
        this.logger.debug('Send "histogram" command: %s', ...arguments)
        super.histogram(...arguments)
      }
    }
  }
}
