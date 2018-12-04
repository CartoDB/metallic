export default class App {
  constructor (app, middlewares) {
    this.provider = app

    middlewares.regist(this.provider)
  }

  listen () {
    return this.provider.listen(...arguments)
  }
}
