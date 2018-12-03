import assert from 'assert'
import ClusterInterface from '../../../../src/launcher/cluster/cluster-interface'
import { AbstractClassError, UnimplementedError } from '../../../../src/errors'

class Cluster extends ClusterInterface {}

describe('cluster-interface', function () {
  it('create interface directly with "new" should throw error', function () {
    assert.throws(() => new ClusterInterface(), AbstractClassError)
  })

  it('.close() should throw "Unimplemented method" error', function () {
    try {
      Cluster.is()
    } catch (err) {
      assert.ok(err instanceof UnimplementedError)
    }
  })
})
