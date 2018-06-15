import request from 'superagent'
import createEventSource from './createEventSource'
import qs from 'qs'

const createResponseHandler = ({ options, dispatch, reject, resolve }) => {
  const debug = `${options.method.toUpperCase()} ${options.endpoint}`
  return (err, res) => {
    if (!res && !err) {
      err = new Error(`Connection failed: ${debug}`)
    }
    if (err) {
      err.res = res
      dispatch({
        type: 'tahoe.failure',
        meta: options,
        payload: err
      })
      if (options.onGlobalError) options.onGlobalError(err, res)
      if (options.onError) options.onError(err, res)
      return reject(err)
    }

    // handle json responses
    dispatch({
      type: 'tahoe.success',
      meta: options,
      payload: {
        raw: res.body,
        text: res.text
      }
    })
    if (options.onResponse) options.onResponse(res)
    resolve(res)
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

  return new Promise((resolve, reject) => {
    req.end(createResponseHandler({
      options,
      dispatch,
      reject,
      resolve
    }))
  })
}
