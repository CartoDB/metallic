const { FactoryInterface } = require('../../interfaces')
const ServerFactory = require('./server')
const LeaderFactory = require('./leader')

const ClusterClassFactories = new Set([ LeaderFactory, ServerFactory ])

module.exports = class ClusterFactory extends FactoryInterface {
  static create ({ httpServer, metrics, logger, options = { enabled: false } } = {}) {
    for (let ClusterClassFactory of ClusterClassFactories) {
      if (ClusterClassFactory.shouldCreate(options.enabled)) {
        return ClusterClassFactory.create({ httpServer, metrics, logger, options })
      }
    }
  }
}
