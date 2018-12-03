import { ParentClassError } from 'metallic-errors'
import ListenerInterface from './listener-interface'

export default class Listeners extends Set {
  add (listener) {
    if (!(listener instanceof ListenerInterface)) {
      throw new ParentClassError(listener.constructor.name, ListenerInterface.name)
    }

    super.add(listener)

    return this
  }

  listen (handler) {
    for (let listener of this) {
      listener.listen(handler)
    }
  }

  remove () {
    for (let listener of this) {
      listener.remove()
    }
  }
}
