import assert from 'assert'
import HelloWorld from './example/hello-world'

describe('config examples', function () {
  it('should create a logger instance with the provided name', function () {
    const name = 'wadus'
    const metallic = HelloWorld.create({ name })

    const { logger } = metallic

    assert.equal(logger.fields.name, name)
  })

  it('should not create a logger instance', function () {
    const { logger } = HelloWorld.create({
      logger: {
        enabled: false
      }
    })

    assert.equal(logger, undefined)
  })

  it('should create a logger with console output', function () {
    const { logger } = HelloWorld.create({
      logger: {
        console: true
      }
    })

    assert.ok(logger.streams.some(stream => stream.type === 'stream'))
  })

  it('should create a logger with file output', function () {
    const { logger } = HelloWorld.create({
      logger: {
        file: true
      }
    })

    assert.ok(logger.streams.some(stream => stream.type === 'file'))
  })

  it('should create a metrics client', function () {
    const { metrics } = HelloWorld.create({
      metrics: {
        enabled: true
      }
    })

    assert.equal(metrics.prefix, 'metallic:server')
  })

  it('should not create a metrics instance', function () {
    const { metrics } = HelloWorld.create({
      metrics: {
        enabled: false
      }
    })

    assert.equal(metrics, undefined)
  })
})
