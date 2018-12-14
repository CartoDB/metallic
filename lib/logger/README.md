# Logger

JSON logging library for CARTO's services, uses [bunyan](https://github.com/trentm/node-bunyan) behind the scenes.

## Quickstart

```js
import Logger from './path/to/logger'

const logger = Logger.create()

logger.info('Hi there!')
// -> {"name":"my-app","hostname":"localhost","pid":12018,"level":20,"msg":"Hi there!","time":"2017-02-13T13:47:32.521Z","v":0}
```

## Features

- Simple and fast JSON logging
- Focus on CARTO's requirements
- Refresh file streams when process receives `SIGHUP`, useful for log rotation via `logrotate`
- Predefined outputs depending on the evironment

## Installation

Use `-S` or `--save` to include it as dependency in `package.json`

```bash
$ npm install metallic-logger -S
```

## Options

```js
const options = {
  name: 'my-app',
  enabled: true,
  console: true,
  file: true,
  path: '/tmp/my-app.log'
  extra: {
    role: 'http-server'
  }
}
const logger = Logger.create({ options })

logger.info('Hi there!')
// -> {"name":"my-app","role":"http-server","hostname":"localhost","pid":12018,"level":20,"msg":"Hi there!","time":"2017-02-13T13:47:32.521Z","v":0}
```

See `src/defaults.js` to check structure and default values.

  - name: `string`, log identifier; default: name of dependent module
  - enabled: `boolean`, de/activate logging; default: `true`
  - console: `boolean`, de/activate console output; default: `true`
  - file: `boolean`, de/activate console output; default: `true`
  - path: `string`, path to place the log file; default: current working directory
  - extra: `object`, add more context for each log; default: `undefined`

## Outputs

By default, there are two outputs available:
  - Console output is set to `stdout` at the `debug` level when `NODE_ENV` is `development` or `undefined`
  - File output is set to `file` at the `info` level when neither `NODE_ENV` is `development` nor `undefined`

## Advanced

`logger` is meant to be used along `metallic` module. It exposes a common interface to encapsulate logging internals but it provides access to `bunyan`'s object:

```js
const logger = Logger.create({ options })

const bunyan = logger.provider

bunyan.info('Hi there!, I\'m bunyan')
// -> {"name":"my-app","hostname":"localhost","pid":12018,"level":20,"msg":"Hi there!, I'm bunyan","time":"2017-02-13T13:47:32.521Z","v":0}
```

For further configuration, please go to [bunyan's repository](https://github.com/trentm/node-bunyan)
