'use strict'

const path = require('path')
const defaults = require('./defaults')

module.exports = function config (clientOptions = {}) {
  const options = { ...defaults, ...clientOptions }

  options.path = clientOptions.path
    ? clientOptions.path
    : clientOptions.name
      ? path.join(process.cwd(), `${options.name}.log`)
      : options.path

  return options
}
