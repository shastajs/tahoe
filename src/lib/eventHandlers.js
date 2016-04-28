import entify from './entify'

const handlers = {}
handlers.open = ({ options, dispatch }) =>
  dispatch({
    type: 'tahoe.tail.open',
    meta: options
  })

handlers.insert = ({ options, dispatch, data: { next } }) =>
  dispatch({
    type: 'tahoe.tail.insert',
    meta: options,
    payload: {
      normalized: options.model && entify(next, options),
      raw: next
    }
  })

handlers.update = ({ options, dispatch, data: { prev, next } }) =>
  dispatch({
    type: 'tahoe.tail.update',
    meta: options,
    payload: {
      normalized: options.model && {
        prev: entify(prev, options),
        next: entify(next, options)
      },
      raw: {
        prev: prev,
        next: next
      }
    }
  })


handlers.delete = ({ options, dispatch, data: { prev } }) =>
  dispatch({
    type: 'tahoe.tail.delete',
    meta: options,
    payload: {
      normalized: options.model && entify(prev, options),
      raw: prev
    }
  })

export default handlers
