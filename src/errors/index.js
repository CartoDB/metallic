const ExtendableError = require('es6-error')

class UnimplementedError extends ExtendableError {
  constructor (message = 'Unimplemented method') {
    super(message)
  }
}

class AbstractClassError extends ExtendableError {
  constructor (target = 'Unknown class name') {
    super(`${target} cannot be directly constructed`)
  }
}

class ParentClassError extends ExtendableError {
  constructor (target = 'Unknown', parent = 'Unknown') {
    super(`${target} must be a ${parent} instance`)
  }
}

class NotReadyError extends ExtendableError {
  constructor (target = 'Unknown') {
    super(`${target} is not ready`)
  }
}

class ExitError extends ExtendableError {
  constructor (target = 'Unknown') {
    super(`${target} exited accidentaly`)
  }
}

module.exports = { UnimplementedError, AbstractClassError, ParentClassError, NotReadyError, ExitError }
