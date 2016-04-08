import request from 'superagent'
import entify from './entify'
import createEventSource from './createEventSource'

export default (opt) => (dispatch) => {
  dispatch({
    type: 'tahoe.request',
    payload: opt
  })

  if (opt.tail) {
    return createEventSource(opt, dispatch)
  }

  const req = request[opt.method.toLowerCase()](opt.endpoint)
  const debug = `${opt.method.toUpperCase()} ${opt.endpoint}`
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

  req.end((err, res) => {
    if (!res && !err) {
      err = new Error(`Connection failed: ${debug}`)
    }
    if (!err && res.type !== 'application/json') {
      err = new Error(`Unknown response type: '${res.type}' from ${debug}`)
    }
    if (err) {
      if (opt.onError) opt.onError(err)
      return dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: err
      })
    }

    // handle json responses
    if (opt.onResponse) opt.onResponse(res)
    dispatch({
      type: 'tahoe.success',
      meta: opt,
      payload: {
        raw: res.body,
        normalized: opt.model ? entify(res.body, opt) : null
      }
    })
  })
}
