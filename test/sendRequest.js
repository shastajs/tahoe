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
      const options = {
        headers : { header: true },
        query: { query: true },
        body: { body: true },
        withCredentials: true
      }
      prepareRequest(options, req)
      should(req.set.args[0][0]).deepEqual(options.headers)
      should(req.query.args[0][0]).deepEqual(options.query)
      should(req.send.args[0][0]).deepEqual(options.body)
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
    
    let params = null
    const getExpectedParams = (paramsToUpdate) => paramsToUpdate.withMutations((newParams) => {
      newParams.set('getEntities', entify)
      newParams.delete('response')
      newParams.delete('onError')
      newParams.delete('onSuccess')
    }).toJS()

    const getUpdatedParams = (error, response) => params.mergeDeep(fromJS({
      error,
      response
    })).toJS()

    beforeEach(() => {
      params = fromJS({
        options: {
          method: 'get',
          endpoint: '/test'
        },
        dispatch: () => {},
        onError: sinon.stub(),
        onSuccess: sinon.stub()
      })
    })

    it('should call the error callback if an error is received', (done) => {
      const error = new Error('Message')
      const response = null
      params = getUpdatedParams(error, response)
      const expectedParams = getExpectedParams(fromJS(params))
      handleResponse(params)
      const { onSuccess, onError } = params
      should(onSuccess.called).equal(false)
      should(onError.args[0][0]).deepEqual(expectedParams)
      done()
    })
    it('should call the success callback if there are no errors', (done) => {
      const error = null
      const response = {
        body: { test: 1 },
        type: 'application/json'
      }
      params = getUpdatedParams(error, response)
      const expectedParams = getExpectedParams(fromJS(params))
      handleResponse(params)
      const { onSuccess, onError } = params
      should(onError.called).equal(false)
      should(onSuccess.args[0][0]).deepEqual(expectedParams)
      done()
    })
    it('Should generate an error for non json responses', (done) => {
      const error = null
      const updatedError = new Error("Unknown response type: 'html' from GET /test")
      const response = {
        body: { test: 1 },
        type: 'html'
      }
      params = getUpdatedParams(error, response)
      const expectedParams = getExpectedParams(fromJS(params).set('error', updatedError))
      handleResponse(params)
      const { onSuccess, onError } = params
      should(onSuccess.called).equal(false)
      should(onError.args[0][0]).deepEqual(expectedParams)
      done()
    })
    it('should generate an error failed connections', (done) => {
      const error = null
      const updatedError = new Error('Connection failed: GET /test')
      const response = null
      params = getUpdatedParams(error, response)
      const expectedParams = getExpectedParams(fromJS(params).set('error', updatedError))
      handleResponse(params)
      const { onSuccess, onError } = params
      should(onSuccess.called).equal(false)
      should(onError.args[0][0]).deepEqual(expectedParams)
      done()
    })
  })
  describe('the response/request handlers', () => {
    let params = null
    beforeEach(() => {
      params = fromJS({
        dispatch: sinon.stub()
      })
    })
    describe('the handleSuccess helper', () => {
      beforeEach(() => {
        params = params.mergeDeep(fromJS({
          response: {
            body: {
              test: 1
            }
          },
          options: {
            model: {},
            onResponse: sinon.stub()
          },
          getEntities: (body) => ({ entities: body })
        })).toJS()
      })
      it('should call onResponse from options and dispatch a success action', (done) => {
        const { options, response, dispatch } = params
        const { onResponse } = options
        
        handleSuccess(params)
        // the corrent action is dispatched
        should(dispatch.args[0][0]).deepEqual({
          type: 'tahoe.success',
          meta: options,
          payload: {
            raw: response.body,
            normalized: { entities: { test: 1 } }
          }
        })

        // the onResponse callback is called and the response is passed in
        should(onResponse.args[0][0]).deepEqual(response)
        done()
      })
      it('should return null for normalized payload if no model is provided', (done) => {
        params = fromJS(params).deleteIn([ 'options', 'model' ]).toJS()
        const { options, response } = params
        const { dispatch } = params
        handleSuccess(params)
        should(dispatch.args[0][0]).deepEqual({
          type: 'tahoe.success',
          meta: options,
          payload: {
            raw: response.body,
            normalized: null
          }
        })
        done()
      })
    })
    describe('the handleError helper', () => {
      it('should call onError in options and dispatch an error action', (done) => {
        const error = new Error('test')
        const options = {
          onError: sinon.stub()
        }
        params = params.mergeDeep(fromJS({
          error,
          options
        })).toJS()

        handleError(params)
        should(params.dispatch.args[0][0]).deepEqual({
          type: 'tahoe.failure',
          meta: options,
          payload: error
        })
        should(options.onError.args[0][0]).deepEqual(error)
        done()
      })
    })
    describe('the handleRequest helper',  () => {
      const getExpected = (paramsToUpdate) => paramsToUpdate.withMutations((newParams) => {
        newParams.delete('onTail')
        newParams.delete('onStandard')
        newParams.set('beforeEnd', prepareRequest)
        newParams.set('afterEnd', handleResponse)
      }).toJS()
      beforeEach(() => { 
        params = params.mergeDeep(fromJS({
          onTail: sinon.stub(),
          onStandard: sinon.stub()
        }))
      })
      it('should dispatch the request action and call onStandard if options.tail is not provided', (done) => {
        const options = {}
        // set an empty options
        const updatedParams = params.set('options', options)
        const expectedParams = getExpected(updatedParams)
        params = updatedParams.toJS()
        const { onTail, onStandard, dispatch } = params
        handleRequest(params)
        should(dispatch.args[0][0]).deepEqual({
          type: 'tahoe.request',
          payload: options
        })

        // onTail shouldn't be called
        should(onTail.called).equal(false)
        
        // onStandard should receive expectedParams
        should(onStandard.args[0][0]).deepEqual(expectedParams)
        done()
      })
      it('should dispatch the request action and call onTail if tail.opt is provided', (done) => {
        const options = {
          tail : true
        }
        const updatedParams = params.set('options', options)
        const expectedParams = getExpected(updatedParams)
        params = updatedParams.toJS()
        const { dispatch, onTail, onStandard } = params
        handleRequest(params)
        should(dispatch.args[0][0]).deepEqual({
          type: 'tahoe.request',
          payload: options
        })
        should(onStandard.called).equal(false)
        should(onTail.args[0][0]).deepEqual(expectedParams)
        done()
      })
    })
    describe('the handleStandardRequest helper', () => {
      it('should get a new request call beforeEnd and call request.end', (done) => {
        const options = {
          method: 'GET',
          endpoint: '/test'
        }
        const afterEndStub = sinon.stub()
        const beforeEndStub = sinon.stub()
        params = params.mergeDeep(fromJS({
          options,
          beforeEnd: beforeEndStub,
          afterEnd: afterEndStub
        })).toJS()

        const getRequestStub = sinon.stub(request, 'get')
        const requestStub = {
          end: sinon.stub()
        }
        getRequestStub.returns(requestStub)
        handleStandardRequest(params)
        // should pass the endpoint into the right request function
        should(getRequestStub.args[0]).deepEqual([
          '/test'
        ])

        // should pass opt and the request object into beforeEnd
        should(beforeEndStub.args[0]).deepEqual([
          options,
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
