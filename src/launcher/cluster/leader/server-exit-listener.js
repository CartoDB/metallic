import { ListenerAbstract } from '../../../listeners'

export default class ServerExitListener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'exit')
  }
}
