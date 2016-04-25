/* eslint no-console: 0 */
import request from 'superagent'
import entify from './entify'
import createEventSource from './createEventSource'

export default (options) => (dispatch) => {
  const params = {
    options,
    dispatch,
    onTail: createEventSource,
    onStandard: handleStandardRequest
  }
  return handleRequest(params)
}


export const prepareRequest = (options, req) => {
  if (options.headers) {
    req.set(options.headers)
  }
  if (options.query) {
    req.query(options.query)
  }
  if (options.body) {
    req.send(options.body)
  }
  if (options.withCredentials) {
    req.withCredentials()
  }
}

export const handleRequest = ({ options, dispatch, onTail, onStandard }) => {
  const params = {
    options,
    dispatch,
    beforeEnd: prepareRequest,
    afterEnd: handleResponse
  }
  dispatch({
    type: 'tahoe.request',
    payload: options
  })
  options.tail ? onTail(params) : onStandard(params)
}

export const handleSuccess = ({ response, options, dispatch, getEntities }) => {
  if (options.onResponse) options.onResponse(response)
  dispatch({
    type: 'tahoe.success',
    meta: options,
    payload: {
      raw: response.body,
      normalized: options.model ? getEntities(response.body, options) : null
    }
  })
}

export const handleError = ({ error, options, dispatch }) => {
  if (options.onError) options.onError(error)
  return dispatch({
    type: 'tahoe.failure',
    meta: options,
    payload: error
  })
}

export const handleStandardRequest = ({ options, dispatch, beforeEnd, afterEnd }) => {
  const req = request[options.method.toLowerCase()](options.endpoint)
  beforeEnd(options, req)
  req.end((error, response) => {
    const params = {
      options,
      dispatch,
      error,
      response,
      onSuccess: handleSuccess,
      onError: handleError
    }
    return afterEnd(params)
  })
}

export const handleResponse = ({ error, response, options, dispatch, onError, onSuccess }) => {
  const debug = `${options.method.toUpperCase()} ${options.endpoint}`
  if (!response && !error) {
    error = new Error(`Connection failed: ${debug}`)
  }
  if (!error && response.type !== 'application/json') {
    error = new Error(`Unknown response type: '${response.type}' from ${debug}`)
  }
  const params = {
    error,
    options,
    dispatch,
    getEntities: entify
  }

  return error ? onError(params) : onSuccess(params)
}
