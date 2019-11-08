'use strict'

const Mocha = require('mocha')
const { spawn } = require('child_process')
const os = require('os')
const path = require('path')

class TestRunner {
  constructor () {
    this._runner = new Mocha()
    this._runner.globals([ 'endpoints' ])
    global.endpoints = {}
  }

  addSuite ({ name, address = 'localhost', port = 3000 }) {
    this._runner.addFile(path.resolve(`${__dirname}/../${name}-test.js`))

    Object.assign(global.endpoints, { [name]: `http://${address}:${port}` })

    return this
  }

  run () {
    return new Promise((resolve, reject) => {
      this._runner.run(failures => failures ? reject(failures) : resolve())
    })
  }
}

class Cluster {
  constructor ({ poolSize = os.cpus().length, port = 0 } = {}) {
    this._cluster = null
    this.args = [ poolSize, port ]
  }

  run () {
    return new Promise((resolve, reject) => {
      const args = [ path.resolve(`${__dirname}/cluster.js`), ...this.args ]

      this._cluster = spawn('node', args, {
        // Use "stdio: [ 'inherit', 'inherit', 'inherit', 'ipc' ]" for debugging
        stdio: ['ignore', 'ignore', 'ignore', 'ipc']
      })

      this._cluster.on('error', err => {
        reject(err)
      })

      this._cluster.on('message', msg => {
        if (msg && msg.cmd === 'error') {
          return reject(msg.error)
        }

        if (msg && msg.cmd === 'ready') {
          return resolve(msg.clusterInfo)
        }
      })
    })
  }

  stop () {
    return new Promise(resolve => {
      this._cluster.on('exit', (code, signal) => {
        if (signal === 'SIGKILL') {
          resolve()
        }
      })
      spawn('kill', [ '-9', this._cluster.pid ])
    })
  }
}

const noWorkers = new Cluster({ poolSize: 0, port: 0 })
// With just one worker, if we don't define the port
// then the OS will choose another different port after crashing the worker
const oneWorker = new Cluster({ poolSize: 1, port: 3333 })
const multipleWorkers = new Cluster({ poolSize: os.cpus().length, port: 0 })

const testRunner = new TestRunner()
const runScenarios = () => [
  noWorkers.run()
    .then(({ port, address }) => testRunner.addSuite({ name: 'no-workers', port, address })),
  oneWorker.run()
    .then(({ port, address }) => testRunner.addSuite({ name: 'one-worker', port, address })),
  multipleWorkers.run()
    .then(({ port, address }) => testRunner.addSuite({ name: 'multiple-workers', port, address }))
]
const stopScenarios = () => [
  noWorkers.stop(),
  oneWorker.stop(),
  multipleWorkers.stop()
]

Promise.all(runScenarios())
  .then(() => testRunner.run())
  .then(() => Promise.all(stopScenarios()))
  .then(() => process.exit(0))
  .catch(err => {
    console.error('Cluster test failed:', err)
    return Promise.all(stopScenarios())
  })
  .then(() => process.exit(1))
