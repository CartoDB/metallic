'use strict'

const meow = require('meow')
const HelloWorld = require('./hello-world')
const Forbidden = require('./forbidden')
const Negotiation = require('./negotiation')

const examples = new Map()

examples
  .set('hello-world', HelloWorld)
  .set('forbidden', Forbidden)
  .set('negotiation', Negotiation)

const help = `
  Usage:
    $ npm run example [-- <options>]

  Options:
    -n, --name Launch the given example (default: hello-world)

  Examples
    $ npm run example -- -n hello-world
`
const options = {
  alias: {
    n: 'name'
  },
  default: {
    name: 'hello-world'
  }
}

const flags = meow({ help }, options).flags
const Example = examples.get(flags.name)

Example.create(flags).start()
