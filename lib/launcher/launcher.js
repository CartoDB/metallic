'use strict'

const LauncherInterface = require('./launcher-interface')

module.exports = class Launcher extends LauncherInterface {
  constructor ({ target }) {
    super()
    this.target = target
  }

  get role () {
    return this.target.role
  }

  async run () {
    const httpServersInfo = await this.target.run()
    return httpServersInfo
  }

  async close () {
    await this.target.close()
  }

  async exit (failure) {
    await this.target.exit(failure)
  }
}
