import { ListenerAbstract } from '../listeners'

export default class UnhandledRejectionListener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'unhandledRejection')
  }
}
