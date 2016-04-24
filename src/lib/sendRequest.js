/* eslint no-console: 0 */
import request from 'superagent'
import entify from './entify'
import createEventSource from './createEventSource'

export default (opt) => (dispatch) => {
  const params = {
    opt,
    dispatch
  }
  const handlers = {
    onTail: createEventSource,
    onStandard: handleStandardRequest
  }
  return handleRequest(params, handlers)
}


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

export const handleRequest = (params, { onTail, onStandard }) => {
  const { opt, dispatch } = params
  dispatch({
    type: 'tahoe.request',
    payload: opt
  })
  const handlers = {
    beforeEnd: prepareRequest
  }
  opt.tail ? onTail(params) : onStandard(params, handlers)
}

export const handleSuccess = ({ res, opt, dispatch }, { getEntities }) => {
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

export const handleError = ({ err, opt, dispatch }) => {
  if (opt.onError) opt.onError(err)
  return dispatch({
    type: 'tahoe.failure',
    meta: opt,
    payload: err
  })
}

export const handleStandardRequest = (params, { beforeEnd }) => {
  const { opt } = params
  const req = request[opt.method.toLowerCase()](opt.endpoint)
  beforeEnd(opt, req)
  req.end((err, res) => {
    const newParams = {
      err,
      res,
      ...params
    }
    const handlers = {
      onError: handleError,
      onSuccess: handleSuccess
    }
    return handleResponse(newParams, handlers)
  })
}

export const handleResponse = (params, { onError, onSuccess }) => {
  let { err, res, opt } = params
  const handlers = {
    getEntities: entify
  }
  const debug = `${opt.method.toUpperCase()} ${opt.endpoint}`
  if (!res && !err) {
    err = new Error(`Connection failed: ${debug}`)
  }
  if (!err && res.type !== 'application/json') {
    err = new Error(`Unknown response type: '${res.type}' from ${debug}`)
  }
  return err ? onError(params) : onSuccess(params, handlers)
}
