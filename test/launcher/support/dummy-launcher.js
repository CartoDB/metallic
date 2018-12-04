const LauncherInterface = require('../../../src/launcher/launcher-interface')

module.exports = class DummyLauncher extends LauncherInterface {
  async run () {}
  async close () {}
  async exit () {}
}
