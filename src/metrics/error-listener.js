import { ListenerAbstract } from '../listeners'

export default class ErrorListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'error')
  }
}
