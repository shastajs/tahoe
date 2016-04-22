/*global it: true, describe: true, beforeEach: true */
/*eslint no-console: 0*/

import { fromJS } from 'immutable'
import should from 'should'
import request from 'superagent'
import sendRequest, { 
  prepareRequest, 
  handleResponse, 
  handleSuccess, 
  handleError,
  handleRequest,
  handleStandardRequest
} from '../src/lib/sendRequest'
import sinon from 'sinon'
import entify from '../src/lib/entify'

describe('sendRequest', () => {
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
  describe('the handleResponse helper', () => {
    const dispatch = () => {}
    const opt = {
      method: 'get',
      endpoint: '/test'
    }
    let successStub = null
    let errorStub = null
    beforeEach(() => {
      successStub = sinon.stub()
      errorStub = sinon.stub()
    })
    it('should call the error callback if an error is received', (done) => {
      const err = new Error('Message')
      const res = null
      handleResponse(err, res, opt, dispatch, errorStub, successStub)
      should(successStub.called).equal(false)
      should(errorStub.args[0]).deepEqual([
        err,
        opt,
        dispatch
      ])
      done()
    })
    it('should call the success callback if there are no errors', (done) => {
      const err = null
      const res = {
        body: { test: 1 },
        type: 'application/json'
      }
      handleResponse(err, res, opt, dispatch, errorStub, successStub)
      should(errorStub.called).equal(false)
      should(successStub.args[0]).deepEqual([
        res,
        opt,
        dispatch,
        entify
      ])
      done()
    })
    it('Should generate an error for non json responses', (done) => {
      const err = null
      const res = {
        body: { test: 1 },
        type: 'html'
      }
      handleResponse(err, res, opt, dispatch, errorStub, successStub)
      should(successStub.called).equal(false)
      should(errorStub.args[0]).deepEqual([
        new Error("Unknown response type: 'html' from GET /test"),
        opt,
        dispatch
      ])
      done()
    })
    it('should generate an error failed connections', (done) => {
      const err = null
      const res = null
      handleResponse(err, res, opt, dispatch, errorStub, successStub)
      should(successStub.called).equal(false)
      should(errorStub.args[0]).deepEqual([
        new Error('Connection failed: GET /test'),
        opt,
        dispatch
      ])
      done()
    })
  })
  describe('the response/request handlers', () => {
    let dispatchStub = null
    beforeEach(() => {
      dispatchStub = sinon.stub()
    })
    describe('the handleSuccess helper', () => {
      const res = {
        body: {
          test: 1
        }
      }
      const opt = {
        model: {},
        onResponse: sinon.stub()
      }
      const getEntities = (body) => ({ entities: body })
      it('should call onResponse from opt and dispatch a success action', (done) => {
        handleSuccess(res, opt, dispatchStub, getEntities)
        // the corrent action is dispatched
        should(dispatchStub.args[0][0]).deepEqual({
          type: 'tahoe.success',
          meta: opt,
          payload: {
            raw: res.body,
            normalized: { entities: { test: 1 } }
          }
        })

        // the onResponse callback is called and the response is passed in
        should(opt.onResponse.args[0][0]).deepEqual(res)
        done()
      })
      it('should return null for normalized payload if no model is provided', (done) => {
        const updatedOpt = fromJS(opt).delete('model').toJS()
        handleSuccess(res, updatedOpt, dispatchStub, getEntities)
        should(dispatchStub.args[0][0]).deepEqual({
          type: 'tahoe.success',
          meta: updatedOpt,
          payload: {
            raw: res.body,
            normalized: null
          }
        })
        done()
      })
    })
    describe('the handleError helper', () => {
      it('should call onError in opt and dispatch an error action', (done) => {
        const err = new Error('test')
        const opt = {
          onError: sinon.stub()
        }
        handleError(err, opt, dispatchStub)
        should(dispatchStub.args[0][0]).deepEqual({
          type: 'tahoe.failure',
          meta: opt,
          payload: err
        })
        should(opt.onError.args[0][0]).deepEqual(err)
        done()
      })
    })
    describe('the handleRequest helper',  () => {
      let tailStub = null
      let standardStub = null
      beforeEach(() => {
        tailStub = sinon.stub()
        standardStub = sinon.stub()
      })
      it('should dispatch the request action and call onStandard if tail.opt is not provided', (done) => {
        const opt = {}
        handleRequest(opt, dispatchStub, tailStub, standardStub)
        should(dispatchStub.args[0][0]).deepEqual({
          type: 'tahoe.request',
          payload: opt
        })
        should(tailStub.called).equal(false)
        should(standardStub.args[0]).deepEqual([
          opt,
          dispatchStub,
          prepareRequest
        ])
        done()
      })
      it('should dispatch the request action and call onTail if tail.opt is provided', (done) => {
        const opt = {
          tail : true
        }
        handleRequest(opt, dispatchStub, tailStub, standardStub)
        should(dispatchStub.args[0][0]).deepEqual({
          type: 'tahoe.request',
          payload: opt
        })
        should(standardStub.called).equal(false)
        should(tailStub.args[0]).deepEqual([
          opt,
          dispatchStub
        ])
        done()
      })

    })
    describe('the handleStandardRequest helper', () => {
      it('should get a new request call beforeEnd and call request.end', (done) => {
        const opt = {
          method: 'GET',
          endpoint: '/test'
        }
        const getRequestStub = sinon.stub(request, 'get')
        const requestStub = {
          end: sinon.stub()
        }
        const beforeEndStub = sinon.stub()
        getRequestStub.returns(requestStub)
        handleStandardRequest(opt, dispatchStub, beforeEndStub)
        // should pass the point into the right request function
        should(getRequestStub.args[0]).deepEqual([
          '/test'
        ])

        // should pass opt and the request object into beforeEnd
        should(beforeEndStub.args[0]).deepEqual([
          opt,
          requestStub
        ])

        // TODO: assert the actual contents of whats
        // passed into end
        should(requestStub.end.calledOnce).equal(true)
        done()
      })
    })
  })

})
