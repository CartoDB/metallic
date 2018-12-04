import LoggerOutputInterface from './logger-output-interface'

export default class FileOutput extends LoggerOutputInterface {
  constructor (enabled = false, path) {
    super()
    this.level = 'info'
    this.enabled = enabled
    this.path = path
  }

  isAvailable () {
    return this.enabled
  }
}
