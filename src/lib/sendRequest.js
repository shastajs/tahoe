/* eslint no-console: 0 */
import request from 'superagent'
import entify from './entify'
import createEventSource from './createEventSource'

export default (opt) => (dispatch) => handleRequest(opt, dispatch, createEventSource, handleStandardRequest)

export const prepareRequest = (opt, req) => {
  if (opt.headers) {
    req.set(opt.headers)
  }
  if (opt.query) {
    req.query(opt.query)
  }
  if (opt.body) {
    req.send(opt.body)
  }
  if (opt.withCredentials) {
    req.withCredentials()
  }
}

export const handleRequest = (opt, dispatch, onTail, onStandard) => {
  dispatch({
    type: 'tahoe.request',
    payload: opt
  })
  opt.tail ? onTail(opt, dispatch) : onStandard(opt, dispatch, prepareRequest)
}

export const handleSuccess = (res, opt, dispatch, getEntities) => {
  if (opt.onResponse) opt.onResponse(res)
  dispatch({
    type: 'tahoe.success',
    meta: opt,
    payload: {
      raw: res.body,
      normalized: opt.model ? getEntities(res.body, opt) : null
    }
  })
}

export const handleError = (err, opt, dispatch) => {
  if (opt.onError) opt.onError(err)
  return dispatch({
    type: 'tahoe.failure',
    meta: opt,
    payload: err
  })
}

export const handleStandardRequest = (opt, dispatch, beforeEnd) => {
  const req = request[opt.method.toLowerCase()](opt.endpoint)
  beforeEnd(opt, req)
  req.end((err, res) => handleResponse(err, res, opt, dispatch, handleError, handleSuccess))
}

export const handleResponse = (err, res, opt, dispatch, onError, onSuccess) => {
  const debug = `${opt.method.toUpperCase()} ${opt.endpoint}`
  if (!res && !err) {
    err = new Error(`Connection failed: ${debug}`)
  }
  if (!err && res.type !== 'application/json') {
    err = new Error(`Unknown response type: '${res.type}' from ${debug}`)
  }
  return err ? onError(err, opt, dispatch) : onSuccess(res, opt, dispatch, entify)
}
