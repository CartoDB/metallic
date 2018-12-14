# App

A Koa's application bundled with common middlewares to build CARTO's services in a fancy way.

## Quickstart

  - Create `app.js`:

```js
import { default as AppFactory } from './path/to/app'

const app = AppFactory.create(/* { config } */)

await app.run()
```

  - Run:

```
$ node app.js
```

## Configuration

A working example with default values:

```js
const app = AppFactory.create({
    metrics, // a metallic-metrics' instance (optional, default: undefined)
    logger, // a metallic-logger's instance (required)
    options: {
        port: 0 // port to listen (optional, default: 0)
    }
})
```

### metrics: Object (default: undefined)

A metallic-metrics' instance. Further documentation: [metallic-metrics](https://github.com/CartoDB/metallic-metrics)

### logger: Object (required)

A metallic-logger's instance. Further documentation: [metallic-logger](https://github.com/CartoDB/metallic-logger)

### options: Object (default: undefined)

- port: port to listen incoming requests (optional, default: 0). If port is not provided then operating system will assign a random port, which can be retrieved by using `app.address().port` after awaiting `.run()`.

## Features

- Proper error handling
- Identifies every request with a unique identifier setting a custom header `X-Request-ID` and accesible by `ctx.state.requestId`
- Adds response time header `X-Response-Time`
- Request/Response logging
- Provides an accessor to `metrics` in request/reponse context


## API

### `await app.run()`

Accepts connections on the specified port, if provided.

### `await app.close()`

Stop to accept connections.
