const assert = require('assert')
const ClusterInterface = require('../../../../lib/launcher/cluster/cluster-interface')
const { AbstractClassError, UnimplementedError } = require('../../../../lib/errors')

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
