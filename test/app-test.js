'use strict'

const assert = require('assert')
const fetch = require('node-fetch')
const HelloWorld = require('./example/hello-world')

const UUID_REGEX = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i

describe('end-to-end app examples', function () {
  before(function () {
    this.sut = HelloWorld.create({ port: 0 })
  })

  beforeEach(async function () {
    const httpServerInfo = await this.sut.start()
    this.port = httpServerInfo[process.pid].port
  })

  afterEach(async function () {
    await this.sut.stop()
  })

  it('GET / should response 200 ok', async function () {
    const res = await fetch(`http://localhost:${this.port}/`)
    const body = await res.text()

    assert.ok(res.ok)
    assert.strictEqual(res.status, 200)
    assert.strictEqual(res.headers.get('content-type'), 'application/octet-stream')
    assert.strictEqual(body, 'Hello World\n')
  })

  it('GET / should response with the given x-request-id header', async function () {
    const res = await fetch(`http://localhost:${this.port}/`, {
      headers: { 'x-request-id': 'wadus' }
    })

    assert.ok(res.ok)
    assert.strictEqual(res.headers.get('x-request-id'), 'wadus')
  })

  it('GET / should response with x-request-id header', async function () {
    const res = await fetch(`http://localhost:${this.port}/`)

    assert.ok(res.ok)
    assert.ok(res.headers.get('x-request-id').match(UUID_REGEX))
  })
})
