import { AbstractClassError } from '../errors'
import { RunnerInterface } from '../interfaces'

export default class LauncherInterface extends RunnerInterface {
  constructor () {
    if (new.target === LauncherInterface) {
      throw new AbstractClassError(LauncherInterface.name)
    }
    super()
  }
}
