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
    
    const params = {
      opt: {
        method: 'get',
        endpoint: '/test'
      },
      dispatch: () => {}
    }
    let handlers = {
      onError: null,
      onSuccess: null
    }
    beforeEach(() => {
      handlers.onSuccess = sinon.stub()
      handlers.onError = sinon.stub()
    })

    it('should call the error callback if an error is received', (done) => {
      const updatedParams = {
        err: new Error('Message'),
        res: null,
        ...params
      }
      handleResponse(updatedParams, handlers)
      should(handlers.onSuccess.called).equal(false)
      should(handlers.onError.args[0][0]).deepEqual(updatedParams)
      done()
    })
    it('should call the success callback if there are no errors', (done) => {
      const updatedParams = {
        err: null,
        res: {
          body: { test: 1 },
          type: 'application/json'
        },
        ...params
      }
      handleResponse(updatedParams, handlers)
      should(handlers.onError.called).equal(false)
      should(handlers.onSuccess.args[0]).deepEqual([
        updatedParams,
        { getEntities: entify }
      ])
      done()
    })
    it('Should generate an error for non json responses', (done) => {
      const updatedParams = {
        err: null,
        res: {
          body: { test: 1 },
          type: 'html'
        },
        ...params
      }
      handleResponse(updatedParams, handlers)
      should(handlers.onSuccess.called).equal(false)
      should(handlers.onError.args[0][0]).deepEqual({
        err: new Error("Unknown response type: 'html' from GET /test"),
        ...updatedParams
      })
      done()
    })
    it('should generate an error failed connections', (done) => {
      const updatedParams = {
        err: null,
        res: null,
        ...params
      }
      handleResponse(updatedParams, handlers)
      should(handlers.onSuccess.called).equal(false)
      should(handlers.onError.args[0][0]).deepEqual({
        err: new Error('Connection failed: GET /test'),
        ...updatedParams
      })
      done()
    })
  })
  describe('the response/request handlers', () => {
    let params = {
      dispatch: null
    }
    beforeEach(() => {
      params.dispatch = sinon.stub()
    })
    describe('the handleSuccess helper', () => {
      const handlers = {
        getEntities: (body) => ({ entities: body })
      }
      let updatedParams = null
      beforeEach(() => {
        updatedParams = {
          res: {
            body: {
              test: 1
            }
          },
          opt: {
            model: {},
            onResponse: sinon.stub()
          },
          ...params
        }
      })
      it('should call onResponse from opt and dispatch a success action', (done) => {
        const { opt, res, dispatch } = updatedParams
        const { onResponse } = opt
        handleSuccess(updatedParams, handlers)
        // the corrent action is dispatched
        should(dispatch.args[0][0]).deepEqual({
          type: 'tahoe.success',
          meta: opt,
          payload: {
            raw: res.body,
            normalized: { entities: { test: 1 } }
          }
        })

        // the onResponse callback is called and the response is passed in
        should(onResponse.args[0][0]).deepEqual(res)
        done()
      })
      it('should return null for normalized payload if no model is provided', (done) => {
        const { dispatch } = updatedParams
        const paramsWithoutModel = fromJS(updatedParams).deleteIn([ 'opt', 'model' ]).toJS()
        const { opt, res } = paramsWithoutModel
        handleSuccess(paramsWithoutModel, handlers)
        should(dispatch.args[0][0]).deepEqual({
          type: 'tahoe.success',
          meta: opt,
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
        const updatedParams = {
          err,
          opt,
          ...params
        }
        handleError(updatedParams)
        should(updatedParams.dispatch.args[0][0]).deepEqual({
          type: 'tahoe.failure',
          meta: opt,
          payload: err
        })
        should(opt.onError.args[0][0]).deepEqual(err)
        done()
      })
    })
    describe('the handleRequest helper',  () => {
      let handlers = {
        onTail: null,
        onStandard: null
      }
      beforeEach(() => {
        handlers.onTail = sinon.stub()
        handlers.onStandard = sinon.stub()
      })
      it('should dispatch the request action and call onStandard if tail.opt is not provided', (done) => {
        const opt = {}
        const updatedParams = {
          opt,
          ...params
        }
        handleRequest(updatedParams, handlers)
        should(updatedParams.dispatch.args[0][0]).deepEqual({
          type: 'tahoe.request',
          payload: opt
        })
        should(handlers.onTail.called).equal(false)
        should(handlers.onStandard.args[0]).deepEqual([
          updatedParams,
          { beforeEnd: prepareRequest }
        ])
        done()
      })
      it('should dispatch the request action and call onTail if tail.opt is provided', (done) => {
        const opt = {
          tail : true
        }
        const updatedParams = {
          opt,
          ...params
        }
        handleRequest(updatedParams, handlers)
        should(updatedParams.dispatch.args[0][0]).deepEqual({
          type: 'tahoe.request',
          payload: opt
        })
        should(handlers.onStandard.called).equal(false)
        should(handlers.onTail.args[0][0]).deepEqual(updatedParams)
        done()
      })
    })
    describe('the handleStandardRequest helper', () => {
      it('should get a new request call beforeEnd and call request.end', (done) => {
        const opt = {
          method: 'GET',
          endpoint: '/test'
        }
        const updatedParams = {
          opt,
          ...params
        }
        const getRequestStub = sinon.stub(request, 'get')
        const requestStub = {
          end: sinon.stub()
        }
        const beforeEndStub = sinon.stub()
        getRequestStub.returns(requestStub)
        handleStandardRequest(updatedParams, { beforeEnd: beforeEndStub })
        
        // should pass the endpoint into the right request function
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
