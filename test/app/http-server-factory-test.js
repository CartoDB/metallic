import assert from 'assert'
import { RunnerInterface } from '../../src/interfaces'
import HttpServerFactory from '../../src/app/http-server-factory'

describe('http-server-factory', function () {
  it('.create() should return a HttpServer instance', function () {
    const httpServer = HttpServerFactory.create()

    assert.ok(httpServer instanceof RunnerInterface)
  })
})
