/*global it: true, describe: true, beforeEach: true */
/*eslint no-console: 0*/

import { fromJS } from 'immutable'
import should from 'should'
import {  createAction } from '../src'
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
      endpoint: (params) => `${params.string}/test`,
      params: {
        string:  '/other'
      }
    }

    const defaults = {
      tail: false,
      collection: false
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
      })
      should(result).be.deepEqual(expected.toJS())
      done()
    })
  })
})
