/*global it: true, describe: true */
/*eslint no-console: 0*/

import should from 'should'
import lib from '../src'

describe('lib', () => {
  it('should exist', (done) => {
    should.exist(lib)
    done()
  })
})
