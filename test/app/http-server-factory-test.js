'use strict'

const assert = require('assert')
const { RunnerInterface } = require('../../lib/interfaces')
const HttpServerFactory = require('../../lib/app/http-server-factory')

describe('http-server-factory', function () {
  it('.create() should return a HttpServer instance', function () {
    const httpServer = HttpServerFactory.create()

    assert.ok(httpServer instanceof RunnerInterface)
  })
})
