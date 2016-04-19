/*global it: true, describe: true, beforeEach: true */
/*eslint no-console: 0*/

import { fromJS } from 'immutable'
import should from 'should'
import {  createAction } from '../src'
import { mergeOptions, handleOptions } from '../src/lib/createAction'

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
  describe('handleOptions', () => {
    let passedInOptions = null
    const onSuccess = (options) => {
      passedInOptions = options
    }
    beforeEach(() => {
      passedInOptions = null
    })
    it('should exist', (done) => {
      should.exist(handleOptions)
      done()
    })
    it('should throw an error if endpoint isn\'t set', (done) =>{
      should.throws(
        () => {
          handleOptions({ method: 'test' }, onSuccess)
        },
        /Missing endpoint/
      )
      done()
    })
    it('should throw an error if method isn\'t set', (done) =>{
      should.throws(
        () => {
          handleOptions({ endpoint: 'test' }, onSuccess)
        },
        /Missing method/
      )
      done()
    })
    it('should pass options into onSuccess', (done) => {
      const options = {
        method: 'test',
        endpoint: 'test'
      }
      handleOptions(options, onSuccess)
      should(passedInOptions).be.deepEqual(options)
      done()
    })
  })
})
