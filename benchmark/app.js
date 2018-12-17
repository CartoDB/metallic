'use strict'

const meow = require('meow')
const { HelloWorld, Forbidden, Negotiation } = require('../examples')

if (typeof process.send !== 'function') {
  throw new Error('This module must be spawned as subprocess with IPC communication channel')
}

const help = `
Usage:
  $ npm run benchmark [-- <options>]

Options:
  --name Name of the application to perform the benchmark
  --release Save results in ./BENCHMARK.md (default: disable)

Examples
  $ npm run benchmark -- --release
`

const { name, ...options } = meow({ help }, {
  alias: {
    n: 'name'
  },
  default: {
    name: 'hello-world'
  }
}).flags

const AppFactory = new Map()
  .set('hello-world', HelloWorld)
  .set('forbidden', Forbidden)
  .set('negotiation', Negotiation)
  .get(name)

if (!AppFactory) {
  process.send({ error: `Application ${name} not found` })
}

async function run () {
  const app = AppFactory.create(options)

  try {
    const httpServersInfo = await app.start()
    process.send(httpServersInfo)
  } catch (err) {
    app.logger.error(err)
  }
}

run()
