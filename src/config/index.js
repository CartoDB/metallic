import parseArguments from './argv/parse'
import { Role } from 'metallic-launcher'
import defaults from './defaults'

export default function config (clientOptions = {}) {
  const argumentOptions = parseArguments(clientOptions.arguments)
  const options = { ...defaults, ...clientOptions, ...argumentOptions }
  options.cluster.role = Role.getName(options.cluster.enabled)

  return options
}
