const meow = require('meow')

const help = `
  Usage:
    $ node $0 --cluster

  Options:
    --cluster enable cluster mode

  Examples
    $ node $0 --cluster // Starts the server with cluster mode enabled
`

const { cluster } = meow({ help }, {
  alias: {
    c: 'cluster'
  },
  boolean: [
    'cluster'
  ],
  default: {
    cluster: false
  }
}).flags

const Launcher = require('../../../lib/launcher')

const Koa = require('koa')
const app = new Koa()

app.use(async (ctx, next) => {
  if (ctx.path !== '/') {
    return next()
  }
  ctx.response.send('hello world\n')
})

app.use(async (ctx, next) => {
  if (ctx.path !== '/exception') {
    return next()
  }
  ctx.response.send('Ooops! Got uncaught exception\n')
  setTimeout(() => { throw new Error('Woops!') }, 1)
})

app.use(async (ctx, next) => {
  if (ctx.path !== '/rejection') {
    return next()
  }

  ctx.response.send('Ooops! Got unhandled rejection\n')

  function reject () {
    return Promise.reject(new Error('Woops!'))
  }

  reject().then(() => { /* this is not going to happen */ })
})

const launcher = Launcher.create({
  httpServer: app,
  options: {
    port: 0,
    cluster: {
      enabled: cluster
    }
  }
})

try {
  launcher.run()
} catch (error) {
  launcher.close()
}
