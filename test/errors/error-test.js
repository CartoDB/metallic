import assert from 'assert'
import * as MetallicErrors from '../../src/errors'

describe('error', function () {
  it('Unimplemented error', function () {
    const UnplimentedError = MetallicErrors.UnplimentedError

    assert.throws(() => {
      throw new UnplimentedError()
    }, UnplimentedError)
  })

  it('Abstract class error', function () {
    const AbstractClassError = MetallicErrors.AbstractClassError

    assert.throws(() => {
      throw new AbstractClassError()
    }, AbstractClassError)
  })

  it('Parent class error', function () {
    const ParentClassError = MetallicErrors.ParentClassError

    assert.throws(() => {
      throw new ParentClassError()
    }, ParentClassError)
  })

  it('Not ready error', function () {
    const NotReadyError = MetallicErrors.NotReadyError

    assert.throws(() => {
      throw new NotReadyError()
    }, NotReadyError)
  })

  it('Exit error', function () {
    const ExitError = MetallicErrors.ExitError

    assert.throws(() => {
      throw new ExitError()
    }, ExitError)
  })
})
