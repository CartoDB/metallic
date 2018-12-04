const LeaderInterface = require('../../../lib/launcher/cluster/leader/leader-interface')

module.exports = class DummyLeader extends LeaderInterface {
  static is () {}
  async run () {}
  async close () {}
  async exit () {}
  async refork () {}
  async reboot () {}
  async rotateLog () {}
}
