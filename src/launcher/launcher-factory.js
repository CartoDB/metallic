const { FactoryInterface } = require('../interfaces')
const ClusterFactory = require('./cluster')
const { Listeners } = require('../listeners')
const ListenerLoggerMixin = require('./listener-logger-mixin')
const SigintListener = require('./sigint-listener')
const SigtermListener = require('./sigterm-listener')
const UncaughtExceptionListener = require('./uncaught-exception-listener')
const UnhandledRejectionListener = require('./unhandled-rejection-listener')
const LauncherExitOnErrorMixin = require('./launcher-exit-on-error-mixin')
const LauncherUncaughtExceptionListenerMixin = require('./launcher-uncaught-exception-listener-mixin')
const LauncherExitSignalListenerMixin = require('./launcher-exit-signal-listener-mixin')
const LauncherUnhandledRejectionListenerMixin = require('./launcher-unhandled-rejection-listener-mixin')
const LauncherLoggerMixin = require('./launcher-logger-mixin')
const LauncherMetricsMixin = require('./launcher-metrics-mixin')
const Launcher = require('./launcher')

module.exports = class LauncherFactory extends FactoryInterface {
  static create ({ httpServer, metrics, logger, options } = {}) {
    const target = ClusterFactory.create({ httpServer, metrics, logger, options })

    const Sigint = logger ? ListenerLoggerMixin.mix(SigintListener) : SigintListener
    const Sigterm = logger ? ListenerLoggerMixin.mix(SigtermListener) : SigtermListener

    const exitSignalListeners = new Listeners()
      .add(new Sigint({ logger, emitter: process }))
      .add(new Sigterm({ logger, emitter: process }))

    const UncaughtException = logger ? ListenerLoggerMixin.mix(UncaughtExceptionListener) : UncaughtExceptionListener
    const uncaughtExceptionListeners = new Listeners()
      .add(new UncaughtException({ logger, emitter: process }))

    const UnhandledRejection = logger ? ListenerLoggerMixin.mix(UnhandledRejectionListener) : UnhandledRejectionListener
    const unhandledRejectionListeners = new Listeners()
      .add(new UnhandledRejection({ logger, emitter: process }))

    let FeaturedLauncher = logger ? LauncherLoggerMixin.mix(Launcher) : Launcher
    FeaturedLauncher = metrics ? LauncherMetricsMixin.mix(Launcher) : FeaturedLauncher

    FeaturedLauncher = LauncherExitOnErrorMixin.mix(
      LauncherExitSignalListenerMixin.mix(
        LauncherUncaughtExceptionListenerMixin.mix(
          LauncherUnhandledRejectionListenerMixin.mix(
            FeaturedLauncher
          )
        )
      )
    )

    return new FeaturedLauncher({
      logger,
      metrics,
      uncaughtExceptionListeners,
      exitSignalListeners,
      unhandledRejectionListeners,
      target
    })
  }
}
