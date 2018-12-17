'use strict'

const path = require('path')
const readPkgUp = require('read-pkg-up')

const { pkg } = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
})

module.exports = {
  name: pkg.name,
  enabled: true,
  console: true,
  file: true,
  path: path.join(process.cwd(), `${pkg.name}.log`)
}
