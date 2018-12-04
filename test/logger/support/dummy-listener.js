import { ListenerAbstract } from '../../../src/listeners'

export default class DummyListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'message')
    this.command = 'wadus'
  }
}
