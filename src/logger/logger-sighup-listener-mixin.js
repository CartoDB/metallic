import { ListenerInterface } from '../listeners'
import { ParentClassError } from '../errors'

export default class LoggerSighupListenerMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ sighupListener }) {
        super(...arguments)

        if (!(sighupListener instanceof ListenerInterface)) {
          throw new ParentClassError(sighupListener.constructor.name, ListenerInterface.name)
        }

        this.sighupListener = sighupListener
      }

      async run () {
        this.sighupListener.listen(() => this.reopenFileStreams())
        return super.run()
      }

      async close () {
        this.sighupListener.remove()
        return super.close()
      }
    }
  }
}
