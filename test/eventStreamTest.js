/*global it: true, describe: true, beforeEach: true */
/*eslint no-console: 0*/

import should from 'should'
import createEventSource, { handleMessage, dispatchMessageType, getPayload }  from '../src/lib/createEventSource'
import sinon from 'sinon'

describe('createEventSource', () => {
  describe('the default function', () => {
    const opt = {
      endpoint: '/test',
      query: {
        query1: 'foo'
      },
      withCredentials: true
    }
    const dispatch = () => {}
    let listenerStub = null
    beforeEach(() => {
      global.EventSource = sinon.stub()
      listenerStub = sinon.stub()
      global.EventSource.prototype.addEventListener = listenerStub
    })
    it('should exist', (done) => {
      should.exist(createEventSource)
      done()
    })
    it('should create an event source and add listeners', (done) => {
      createEventSource(opt, dispatch)
      should(EventSource.calledWith('/test?query1=foo', { withCredentials : true })).equal(true)
      should(listenerStub.firstCall.calledWith('insert')).equal(true)
      should(listenerStub.secondCall.calledWith('update')).equal(true)
      should(listenerStub.thirdCall.calledWith('delete')).equal(true)
      done()
    })
  })
  describe('the handle message helper', () => {
    const opt = { test: 1 }
    let dispatchStub = null
    beforeEach(() => {
      dispatchStub = sinon.stub()
    })
    it('should dispatch any JSON parsing errors', (done) => {
      const badResponse = {
        data: '{'
      }
      handleMessage(opt, dispatchStub, 'insert')(badResponse)
      should(dispatchStub.calledWith({
        type: 'tahoe.failure',
        meta: opt,
        payload: new Error('SyntaxError: Unexpected token u')
      })).equal(true)
      done()
    })
  }) 
  describe('the dispatchMessageType helper', () => {
    const opt = {
      model: {}
    }
    const body = {
      next : {
        test: 1
      }
    }
    let dispatchStub = null
    const entifyStub = (body) => ({ entities : body })
    beforeEach(() => {
      dispatchStub = sinon.stub()
    })
    it('should get the correct type and payload and pass them into dispatch', (done) => {
      dispatchMessageType(body, opt, dispatchStub, entifyStub, 'insert')
      should(dispatchStub.firstCall.args).deepEqual([
        {
          type: 'tahoe.tail.insert',
          meta: opt,
          payload: {
            normalized: { entities : body.next },
            raw: body.next
          }
        }
      ])
      done()
    })
  }) 
  describe('the getPayload helper', () => {
    const opt = {
      model: {}
    }
    const data = {
      prev: { test: 'prev' },
      next: { test: 'next' }
    }
    const getEntities = (body) => ({ entities : body })
    it('should return the correct payload on delete', (done) =>{
      should(getPayload(data, opt, getEntities, 'delete')).deepEqual({
        normalized: {
          entities: data.prev
        },
        raw: data.prev
      })
      done()
    })
    it('should return the correct payload on update', (done) =>{
      should(getPayload(data, opt, getEntities, 'update')).deepEqual({
        normalized: {
          prev: { entities: data.prev },
          next: { entities: data.next }
        },
        raw: data
      })
      done()
    })
    it('should set normalized as null if no opt.model is provided', (done) =>{
      should(getPayload(data, {}, getEntities, 'delete')).deepEqual({
        normalized: null,
        raw: data.prev
      })
      done()
    })
  })

  
})
