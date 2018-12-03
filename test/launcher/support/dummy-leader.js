import LeaderInterface from '../../../src/launcher/cluster/leader/leader-interface'

export default class DummyLeader extends LeaderInterface {
  static is () {}
  async run () {}
  async close () {}
  async exit () {}
  async refork () {}
  async reboot () {}
  async rotateLog () {}
}
