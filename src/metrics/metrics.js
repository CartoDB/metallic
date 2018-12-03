import MetricsInterface from './metrics-interface'

export default class Metrics extends MetricsInterface {
  constructor ({ provider }) {
    super()
    this.provider = provider
  }

  async run () {}

  async close () {}

  timing () {
    this.provider.timing(...arguments)
  }

  gauge () {
    this.provider.gauge(...arguments)
  }

  unique () {
    this.provider.unique(...arguments)
  }

  set () {
    this.provider.set(...arguments)
  }

  increment () {
    this.provider.increment(...arguments)
  }

  decrement () {
    this.provider.decrement(...arguments)
  }

  histogram () {
    this.provider.histogram(...arguments)
  }
}
