import { ListenerInterface } from '../listeners'
import { ParentClassError } from '../errors'

export default class LoggerLogCommandListenerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ logCommandListener }) {
        super(...arguments)

        if (!(logCommandListener instanceof ListenerInterface)) {
          throw new ParentClassError(logCommandListener.constructor.name, ListenerInterface.name)
        }

        this.logCommandListener = logCommandListener
      }

      async run () {
        this.logCommandListener.listen(command => {
          return command === this.logCommandListener.command
            ? this.reopenFileStreams()
            : undefined
        })

        return super.run()
      }

      async close () {
        this.logCommandListener.remove()
        return super.close()
      }
    }
  }
}
