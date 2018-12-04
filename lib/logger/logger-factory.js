const { FactoryInterface } = require('../interfaces')
const Bunyan = require('bunyan')
const Logger = require('./logger')
const LoggerOutputs = require('./outputs/logger-outputs')
const ConsoleOutput = require('./outputs/console-output')
const FileOutput = require('./outputs/file-output')
const SighupListener = require('./sighup-listener')
const LoggerSighupListenerMixin = require('./logger-sighup-listener-mixin')
const LogCommandListener = require('./log-command-listener')
const LoggerLogCommandListenerMixin = require('./logger-log-command-listener-mixin')
const config = require('./config')

module.exports = class LoggerFactory extends FactoryInterface {
  static create ({ options } = {}) {
    const opts = config(options)

    if (!opts.enabled) {
      return
    }

    const isConsoleOutputEnabled = opts.console
    const isFileOutputEnabled = opts.file
    const outputFilePath = opts.path

    const loggerOutputs = new LoggerOutputs()
      .add(new ConsoleOutput(isConsoleOutputEnabled))
      .add(new FileOutput(isFileOutputEnabled, outputFilePath))

    const bunyan = Bunyan.createLogger({
      name: opts.name,
      streams: loggerOutputs.toArray(),
      serializers: Bunyan.stdSerializers,
      ...opts.extra
    })

    const sighupListener = new SighupListener(process)
    const logCommandListener = new LogCommandListener(process)
    const EventedLogger = LoggerSighupListenerMixin.mix(
      LoggerLogCommandListenerMixin.mix(
        Logger
      )
    )

    return new EventedLogger({
      sighupListener,
      logCommandListener,
      provider: bunyan
    })
  }
}
