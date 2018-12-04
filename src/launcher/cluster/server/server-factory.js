const { FactoryInterface } = require('../../../interfaces')
const Server = require('./server')

module.exports = class ServerFactory extends FactoryInterface {
  static create ({ httpServer } = {}) {
    return new Server({ httpServer })
  }

  static shouldCreate (clusterOn) {
    return Server.is(clusterOn)
  }
}
