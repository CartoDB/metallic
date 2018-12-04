import { ListenerAbstract } from '../listeners'

export default class LogCommandListener extends ListenerAbstract {
  constructor (emitter) {
    super(emitter, 'message')
    this.command = 'logger:reopen-file-streams'
  }
}
