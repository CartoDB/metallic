import { ListenerAbstract } from 'metallic-listeners'

export default class ErrorListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'error')
  }
}
