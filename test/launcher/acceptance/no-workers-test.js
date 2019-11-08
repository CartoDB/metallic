'use strict'

const fetch = require('node-fetch')
const assert = require('assert')
const endpoint = global.endpoints['no-workers']

function fetchWorker ({ endpoint }) {
  return fetch(`${endpoint}/pid`)
    .then(res => res.json())
    .then(worker => {
      assert.strictEqual(Object.keys(worker).length, 1)

      for (const id in worker) {
        if (worker.hasOwnProperty(id)) {
          assert.ok(worker[id] > 0 && worker[id] <= 65535)
        }
      }

      return worker
    })
}

describe('cluster (poolSize: 0)', function () {
  it(`GET ${endpoint} should respond with 200 OK ('hello world')`, function () {
    return fetch(endpoint)
      .then(res => res.text())
      .then(body => assert.strictEqual('hello world', body))
  })

  it(`GET ${endpoint}/pid should respond with information about the process`, function () {
    return fetchWorker({ endpoint })
  })

  it('on multiple requests should respond the same process', function () {
    const fetchs = []

    for (let index = 0; index < 10; index++) {
      fetchs.push(fetchWorker({ endpoint }))
    }

    return Promise.all(fetchs)
      .then(results => Object.assign({}, ...results))
      .then(workers => assert.strictEqual(Object.keys(workers).length, 1))
  })

  it('after crashing the process should not be able to respond following requests', function () {
    return fetch(`${endpoint}/crash`)
      .then(res => res.text())
      .then(body => assert.strictEqual('crashing', body))
      .then(() => fetch(`${endpoint}/`))
      .catch(err => {
        assert.ok(err && err.message)
      })
  })
})
