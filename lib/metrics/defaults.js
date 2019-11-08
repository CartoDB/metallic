'use strict'

const readPkgUp = require('read-pkg-up')

const { packageJson: pkg } = readPkgUp.sync({
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
