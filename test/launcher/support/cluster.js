'use strict'

if (typeof process.send !== 'function') {
  throw new Error('This module must be spawned as subprocess with IPC communication channel')
}

const os = require('os')
const cluster = require('cluster')
const poolSize = process.argv[2] || os.cpus().length
const isClusterOn = poolSize > 0
const port = process.argv[3] || 0 // When 0, let the OS to choose an available port

const express = require('express')
const clusterProcessFactory = require('../../../cluster')
const app = express()
const Logger = require('../../../../api/tilesets/services/logger')

app.use('/pid', (req, res) => {
  let body = null

  if (cluster.isWorker) {
    body = {
      [cluster.worker.id]: cluster.worker.process.pid
    }
  } else {
    body = {
      '0': process.pid
    }
  }

  res.send(body)
})
app.use('/crash', (req, res) => {
  // Throws an uncaught exception to be handled by Launcher.
  // It will exit with a non-zero error code.
  setTimeout(() => {
    throw new Error('woooops!')
  }, 1)

  res.send('crashing')
})
app.use('/', (req, res) => res.send('hello world'))

const logger = new Logger(null, 'test-tilesets-api')
const clusterProcess = clusterProcessFactory({
  isClusterOn,
  poolSize,
  server: app,
  port,
  address: '127.0.0.1',
  logger
})

clusterProcess.start()
  .then(clusterInfo => {
    const pid = Object.keys(clusterInfo).pop()
    process.send({
      cmd: 'ready',
      clusterInfo: clusterInfo[pid]
    })
  })
  .catch(err => {
    process.send({
      cmd: 'error',
      error: err
    })
    process.exit(1)
  })
