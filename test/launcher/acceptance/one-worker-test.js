'use strict'

const fetch = require('node-fetch')
const assert = require('assert')
const clusterPoolSize = 1
const endpoint = global.endpoints['multiple-workers']

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

function fetchAllWorkers ({ endpoint }) {
  const fetchs = []

  for (let index = 0; index < clusterPoolSize; index++) {
    fetchs.push(fetchWorker({ endpoint }))
  }

  return Promise.all(fetchs)
    .then(results => Object.assign({}, ...results))
}

function wait (milliseconds) {
  return new Promise(resolve => setTimeout(resolve, milliseconds))
}

describe(`cluster (poolSize: ${clusterPoolSize})`, function () {
  it(`GET ${endpoint} should respond with 200 OK ('hello world')`, function () {
    return fetch(endpoint)
      .then(res => res.text())
      .then(body => assert.strictEqual('hello world', body))
  })

  it(`GET ${endpoint}/pid should respond with information about the worker's process`, function () {
    return fetchWorker({ endpoint })
  })

  it('should respond the same worker always', function () {
    const fetchs = []

    for (let index = 0; index < (clusterPoolSize * 2); index++) {
      fetchs.push(fetchWorker({ endpoint }))
    }

    return Promise.all(fetchs)
      .then(results => Object.assign({}, ...results))
      .then(workers => assert.strictEqual(Object.keys(workers).length, clusterPoolSize))
  })

  it('after crashing the worker it should relaunch another one and respond to request when ready', function () {
    return fetch(`${endpoint}/crash`)
      .then(res => res.text())
      .then(body => assert.strictEqual('crashing', body))
      .then(() => wait(1000))
      .then(() => fetchAllWorkers())
  })
})
