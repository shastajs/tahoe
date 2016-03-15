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
    if (err) {
      return dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: err
      })
    }

    if (!res) {
      return dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: new Error(`Connection failed: ${debug}`)
      })
    }

    // handle json responses
    if (res.type === 'application/json') {
      return dispatch({
        type: 'tahoe.success',
        meta: opt,
        payload: {
          raw: res.body,
          normalized: entify(res.body, opt)
        }
      })
    }

    dispatch({
      type: 'tahoe.failure',
      meta: opt,
      payload: new Error(`Unknown response type: '${res.type}' from ${debug}`)
    })
  })
}
