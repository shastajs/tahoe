/*global it: true, describe: true, beforeEach: true */
/*eslint no-console: 0*/

import { fromJS } from 'immutable'
import should from 'should'
import sendRequest, { prepareRequest } from '../src/lib/sendRequest'
import sinon from 'sinon'

describe.only('sendRequest', () => {
  describe('the main function', () => {
    it('should exist', (done) => {
      should.exist(sendRequest)
      done()
    })
  })
  describe('the prepareRequest helper', () => {
    let req = null
    beforeEach(() => {
      req = {
        set: sinon.stub(),
        query: sinon.stub(),
        withCredentials: sinon.stub(),
        send: sinon.stub()
      }
    })

    it('should call the right methods on the request using options', (done) => {
      const opt = {
        headers : { header: true },
        query: { query: true },
        body: { body: true },
        withCredentials: true
      }
      prepareRequest(opt, req)
      should(req.set.args[0][0]).deepEqual(opt.headers)
      should(req.query.args[0][0]).deepEqual(opt.query)
      should(req.send.args[0][0]).deepEqual(opt.body)
      should(req.withCredentials.calledOnce).equal(true)
      done()
    })
    it('shouldnt call anything if no opts are provide', (done) => {
      prepareRequest({}, req)
      should(req.set.called).equal(false)
      should(req.query.called).equal(false)
      should(req.send.called).equal(false)
      should(req.withCredentials.called).equal(false)
      done()
    })
  })
})
