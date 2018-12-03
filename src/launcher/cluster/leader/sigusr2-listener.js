import { ListenerAbstract } from '../../../listeners'

export default class Sigusr2Listener extends ListenerAbstract {
  constructor ({ emitter }) {
    super(emitter, 'SIGUSR2')
  }
}
