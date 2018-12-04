const cluster = require('cluster')
const os = require('os')
const { FactoryInterface } = require('../../../interfaces')
const ListenerLoggerMixin = require('../../listener-logger-mixin')
const Sigusr2Listener = require('./sigusr2-listener')
const SighupListener = require('./sighup-listener')
const ServerExitListener = require('./server-exit-listener')
const LeaderRebootListenerMixin = require('./leader-reboot-listener-mixin')
const LeaderReforkListenerMixin = require('./leader-refork-listener-mixin')
const LeaderRotateLogListenerMixin = require('./leader-rotate-log-listener-mixin')
const Leader = require('./leader')

module.exports = class LeaderFactory extends FactoryInterface {
  static create ({ metrics, logger } = {}) {
    const serverPoolSize = os.cpus().length

    const LoggedSigusr2Listener = logger ? ListenerLoggerMixin.mix(Sigusr2Listener) : Sigusr2Listener
    const sigusr2Listeners = new LoggedSigusr2Listener({ logger, emitter: process })

    const LoggedServerExitListener = logger ? ListenerLoggerMixin.mix(ServerExitListener) : ServerExitListener
    const serverExitListeners = new LoggedServerExitListener({ logger, emitter: process })

    const LoggedSighupListener = logger ? ListenerLoggerMixin.mix(SighupListener) : SighupListener
    const sighupListeners = new LoggedSighupListener({ logger, emitter: process })

    const LeaderOnSteroids = LeaderRebootListenerMixin.mix(
      LeaderReforkListenerMixin.mix(
        LeaderRotateLogListenerMixin.mix(
          Leader
        )
      )
    )

    return new LeaderOnSteroids({
      sighupListeners,
      serverExitListeners,
      sigusr2Listeners,
      cluster,
      serverPoolSize
    })
  }

  static shouldCreate (clusterOn) {
    return Leader.is(clusterOn)
  }
}
