import { ListenerInterface } from 'metallic-listeners'
import { ParentClassError } from 'metallic-errors'

export default class LoggerSighupListenerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ errorListener, logger }) {
        super(...arguments)

        if (!(errorListener instanceof ListenerInterface)) {
          throw new ParentClassError(errorListener.constructor.name, ListenerInterface.name)
        }

        this.errorListener = errorListener
        this.logger = logger
      }

      async run () {
        this.errorListener.listen(err => this.logger.error('Error sending stats:', err))
        return super.run()
      }

      async close () {
        this.errorListener.remove()
        return super.close()
      }
    }
  }
}
