const assert = require('assert')
const { AbstractClassError, UnplimentedError, ParentClassError, NotReadyError, ExitError } = require('../../lib/errors')

describe('error', function () {
  it('Unimplemented error', function () {
    assert.throws(() => {
      throw new UnplimentedError()
    }, UnplimentedError)
  })

  it('Abstract class error', function () {
    assert.throws(() => {
      throw new AbstractClassError()
    }, AbstractClassError)
  })

  it('Parent class error', function () {
    assert.throws(() => {
      throw new ParentClassError()
    }, ParentClassError)
  })

  it('Not ready error', function () {
    assert.throws(() => {
      throw new NotReadyError()
    }, NotReadyError)
  })

  it('Exit error', function () {
    assert.throws(() => {
      throw new ExitError()
    }, ExitError)
  })
})
