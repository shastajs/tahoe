/*global it: true, describe: true, beforeEach: true */
/*eslint no-console: 0*/

import should from 'should'
import createEventSource  from '../src/lib/createEventSource'

describe.only('createEventSouce', () => {
  it('should exist', (done) => {
    should.exist(createEventSource)
    done()
  })
})
