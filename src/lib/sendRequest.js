import request from 'superagent'
import entify from './entify'
import createEventSource from './createEventSource'

export default (opt) => (dispatch) => {
  dispatch({
    type: 'tahoe.request',
    payload: opt
  })

  let req = request[opt.method.toLowerCase()](opt.endpoint)

  if (opt.headers) {
    req = req.set(opt.headers)
  }
  if (opt.query) {
    req = req.query(opt.query)
  }
  if (opt.body) {
    req = req.send(opt.body)
  }
  if (opt.withCredentials) {
    req = req.withCredentials()
  }

  if (opt.tail) {
    return createEventSource(req.url, opt, dispatch)
  }

  req.end((err, res) => {
    if (err) {
      return dispatch({
        type: 'tahoe.failure',
        meta: opt,
        payload: err
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
      payload: new Error('Unknown response type')
    })
  })
}
