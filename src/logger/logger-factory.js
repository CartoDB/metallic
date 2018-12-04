import { FactoryInterface } from '../interfaces'
import Bunyan from 'bunyan'
import Logger from './logger'
import LoggerOutputs from './outputs/logger-outputs'
import ConsoleOutput from './outputs/console-output'
import FileOutput from './outputs/file-output'
import SighupListener from './sighup-listener'
import LoggerSighupListenerMixin from './logger-sighup-listener-mixin'
import LogCommandListener from './log-command-listener'
import LoggerLogCommandListenerMixin from './logger-log-command-listener-mixin'
import config from './config'

export default class LoggerFactory extends FactoryInterface {
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
