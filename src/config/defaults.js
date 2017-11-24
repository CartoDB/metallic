import path from 'path'
import readPkgUp from 'read-pkg-up'

const pkg = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
}).pkg

export default {
  name: pkg.name,
  port: 0,
  cluster: {
    enabled: false
  },
  logger: {
    enabled: true,
    console: (process.env.NODE_ENV === 'development' || process.env.NODE_ENV === undefined),
    path: path.join(process.cwd(), pkg.name + '.log')
  },
  metrics: {
    enabled: true,
    host: 'localhost',
    port: 8125,
    interval: process.env.NODE_ENV === 'test' ? 0 : 5000
  },
  arguments: {
    help: undefined
  }
}
