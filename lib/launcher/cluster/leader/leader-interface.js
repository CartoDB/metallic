const { AbstractClassError, UnimplementedError } = require('../../../errors')
const ClusterInterface = require('../cluster-interface')

module.exports = class LeaderInterface extends ClusterInterface {
  constructor () {
    if (new.target === LeaderInterface) {
      throw new AbstractClassError(LeaderInterface.name)
    }
    super()
  }

  refork () {
    throw new UnimplementedError()
  }

  async reboot () {
    throw new UnimplementedError()
  }

  async rotateLog () {
    throw new UnimplementedError()
  }
}
