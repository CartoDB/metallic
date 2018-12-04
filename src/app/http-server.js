const { RunnerInterface } = require('../interfaces')
const { NotReadyError } = require('../errors')

module.exports = class HttpServer extends RunnerInterface {
  constructor ({ app, port }) {
    super()
    this.app = app
    this.port = port
    this.httpServer = null
  }

  get provider () {
    return this.app.provider
  }

  run () {
    return new Promise((resolve, reject) => {
      this.httpServer = this.app.listen(this.port)

      if (!this.httpServer) {
        return reject(new NotReadyError('Server'))
      }

      this.httpServer.once('error', err => reject(err))

      this.httpServer.once('listening', () => {
        resolve(this.httpServer)
      })
    })
  }

  close () {
    return new Promise((resolve, reject) => {
      if (!this.httpServer) {
        return resolve()
      }

      this.httpServer.once('close', () => resolve())
      this.httpServer.once('error', err => reject(err))
      this.httpServer.close()
    })
  }
}
