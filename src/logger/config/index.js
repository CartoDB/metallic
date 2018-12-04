import path from 'path'
import defaults from './defaults'

export default function config (clientOptions = {}) {
  const options = { ...defaults, ...clientOptions }

  options.path = clientOptions.path
    ? clientOptions.path
    : clientOptions.name
      ? path.join(process.cwd(), `${options.name}.log`)
      : options.path

  return options
}
