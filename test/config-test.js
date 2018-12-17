'use strict'

const assert = require('assert')
const HelloWorld = require('./example/hello-world')

describe('config examples', function () {
  it('should create a logger instance with the provided name', function () {
    const name = 'wadus'
    const metallic = HelloWorld.create({ name })

    const { logger } = metallic

    assert.strictEqual(logger.fields.name, name)
  })

  it('should listen on the configured port', async function () {
    const expectedPort = 3456
    const metallic = HelloWorld.create({ port: expectedPort })

    const httpServerInfo = await metallic.start()
    await metallic.stop()

    Object.values(httpServerInfo).forEach(({ port }) => assert.strictEqual(port, expectedPort))
  })

  it('should not create a logger instance', function () {
    const { logger } = HelloWorld.create({
      logger: {
        enabled: false
      }
    })

    assert.strictEqual(logger, undefined)
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

  it('should create a logger with custom file path output', function () {
    const expectedPath = 'wadus.log'
    const { logger } = HelloWorld.create({
      logger: {
        file: true,
        path: expectedPath
      }
    })

    assert.ok(logger.streams.filter(stream => stream.type === 'file').every(stream => stream.path === expectedPath))
  })

  it('should create a logger with custom name', function () {
    const name = 'wadus'
    const expectedFileName = `${name}.log`
    const { logger } = HelloWorld.create({
      name,
      logger: {
        file: true
      }
    })

    assert.ok(logger.streams.filter(stream => stream.type === 'file').every(stream => stream.path.endsWith(expectedFileName)))
  })

  it('should create a metrics client', function () {
    const { metrics } = HelloWorld.create({
      metrics: {
        enabled: true
      }
    })

    assert.strictEqual(metrics.prefix, 'metallic:server')
  })

  it('should not create a metrics instance', function () {
    const { metrics } = HelloWorld.create({
      metrics: {
        enabled: false
      }
    })

    assert.strictEqual(metrics, undefined)
  })
})
