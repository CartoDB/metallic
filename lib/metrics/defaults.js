const readPkgUp = require('read-pkg-up')

const { pkg } = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
})

module.exports = {
  enabled: true,
  host: 'localhost',
  port: 8125,
  prefix: pkg.name,
  suffix: '',
  globalize: false,
  cacheDns: false,
  mock: process.env.NODE_ENV === 'test',
  globalTags: [],
  interval: 5000
}
