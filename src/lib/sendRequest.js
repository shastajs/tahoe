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

  req.end((err, { type, body }) => {
    if (err) {
      return dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: err
      })
    }

    // handle json responses
    if (type === 'application/json') {
      return dispatch({
        type: 'tahoe.success',
        meta: opt,
        payload: {
          raw: body,
          normalized: entify(body, opt)
        }
      })
    }

    dispatch({
      type: 'tahoe.failure',
      meta: opt,
      payload: new Error('Unknown response type')
    })
  })
}
