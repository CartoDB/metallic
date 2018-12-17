'use strict'

module.exports = class MetricsGaugeCPUMixin {
  static mix (superclass) {
    return class extends superclass {
      constructor ({ interval = 0, logger }) {
        super(...arguments)
        this.interval = interval
        this.logger = logger
      }

      async run () {
        if (this.interval) {
          let previousCPUUsage = process.cpuUsage()

          this.cpuInterval = setInterval(() => {
            const CPUUsage = process.cpuUsage(previousCPUUsage)

            Object.keys(CPUUsage).forEach(property => this.gauge(`cpu.${property}`, CPUUsage[property]))

            previousCPUUsage = CPUUsage
          }, this.interval)

          this.logger.debug('Gauge CPU activated every %d seconds', this.interval / 1000)
        }

        return super.run()
      }

      async close () {
        clearInterval(this.cpuInterval)
        this.logger.debug('Gauge CPU interval cleared', this.interval / 1000)
        return super.close()
      }
    }
  }
}
