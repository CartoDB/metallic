const { AbstractClassError, UnimplementedError } = require('../../errors')
const LauncherInterface = require('../launcher-interface')

module.exports = class ClusterInterface extends LauncherInterface {
  constructor () {
    if (new.target === ClusterInterface) {
      throw new AbstractClassError(ClusterInterface.name)
    }
    super()
  }

  static is () {
    throw new UnimplementedError()
  }
}
