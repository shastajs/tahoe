import request from 'superagent'
import createEventSource from './createEventSource'
import qs from 'qs'

const createResponseHandler = ({ options, dispatch }) => {
  const debug = `${options.method.toUpperCase()} ${options.endpoint}`
  return (err, res) => {
    if (!res && !err) {
      err = new Error(`Connection failed: ${debug}`)
    }
    if (!err && res.type !== 'application/json') {
      err = new Error(`Unknown response type: '${res.type}' from ${debug}`)
    }
    if (err) {
      dispatch({
        type: 'tahoe.failure',
        meta: options,
        payload: err
      })
      if (options.onError) options.onError(err, res)
      return
    }

    // handle json responses
    dispatch({
      type: 'tahoe.success',
      meta: options,
      payload: {
        raw: res.body
      }
    })
    if (options.onResponse) options.onResponse(res)
  }
}

export default async ({ options, dispatch }) => {
  dispatch({
    type: 'tahoe.request',
    payload: options
  })

  if (options.tail) {
    return createEventSource({ options, dispatch })
  }

  const req = request[options.method.toLowerCase()](options.endpoint)
  if (options.headers) {
    req.set(options.headers)
  }
  if (options.query) {
    req.query(typeof options.query === 'string'
      ? options.query
      : qs.stringify(options.query, { strictNullHandling: true }))
  }
  if (options.body) {
    req.send(options.body)
  }
  if (options.withCredentials) {
    req.withCredentials()
  }

  req.end(createResponseHandler({ options, dispatch }))

  return req
}
