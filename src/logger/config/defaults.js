import path from 'path'
import readPkgUp from 'read-pkg-up'

const { pkg } = readPkgUp.sync({
  cwd: process.cwd(),
  normalize: false
})

export default {
  name: pkg.name,
  enabled: true,
  console: true,
  file: true,
  path: path.join(process.cwd(), `${pkg.name}.log`)
}
