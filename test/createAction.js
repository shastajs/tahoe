/*global it: true, describe: true, beforeEach: true */
/*eslint no-console: 0*/

import { fromJS, Map } from 'immutable'
import should from 'should'
import { createAction } from '../src'
import { mergeOptions } from '../src/lib/createAction'

describe('createAction', () => {
  it('should exist', (done) => {
    should.exist(createAction)
    done()
  })
  describe('mergeOptions', () => {
    const opt = {
      tail: true,
      onResponse: () => 'response',
      onError: () => 'error',
      method: 'GET',
      params: {
        string: '/other'
      },
      query: { testing: 'abc' }
    }

    const defaults = {
      tail: false,
      collection: false,
      endpoint: (params) => `${params.string}/test`,
      query: () => ({ test: 123 })
    }

    it('should exist', (done) => {
      should.exist(mergeOptions)
      done()
    })
    it('should apply defaults and convert non reserved functions to values', (done) => {
      const result = mergeOptions(opt, defaults)
      const expected = fromJS(opt).withMutations((updated) => {
        updated.set('endpoint', '/other/test')
        updated.set('collection', false)
        updated.set('query', Map({
          test: 123,
          testing: 'abc'
        }))
      })
      should(result).be.deepEqual(expected.toJS())
      done()
    })
  })
})
