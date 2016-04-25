import url from 'url'
import entify from './entify'

const handleMessage = (opt, dispatch, fn) => ({ data }) => {
  try {
    fn(JSON.parse(data), opt, dispatch)
  } catch (err) {
    dispatch({
      type: 'tahoe.failure',
      meta: opt,
      payload: err
    })
  }
}

const handleInsert = ({ next }, opt, dispatch) =>
  dispatch({
    type: 'tahoe.tail.insert',
    meta: opt,
    payload: {
      normalized: opt.model ? entify(next, opt) : null,
      raw: next
    }
  })
const handleUpdate = ({ prev, next }, opt, dispatch) =>
  dispatch({
    type: 'tahoe.tail.update',
    meta: opt,
    payload: {
      normalized: opt.model ? {
        prev: entify(prev, opt),
        next: entify(next, opt)
      } : null,
      raw: {
        prev: prev,
        next: next
      }
    }
  })
const handleDelete = ({ prev }, opt, dispatch) =>
  dispatch({
    type: 'tahoe.tail.delete',
    meta: opt,
    payload: {
      normalized: opt.model ? entify(prev, opt) : null,
      raw: prev
    }
  })

const combineUrl = (endpoint, query) => {
  const ay = url.parse(endpoint, true)
  delete ay.querystring
  ay.query = {
    ...ay.query,
    ...query
  }
  return url.format(ay)
}
export default (opt, dispatch) => {
  const finalUrl = combineUrl(opt.endpoint, opt.query)
  const src = new EventSource(finalUrl, { withCredentials: opt.withCredentials })
  src.addEventListener('insert', handleMessage(opt, dispatch, handleInsert))
  src.addEventListener('update', handleMessage(opt, dispatch, handleUpdate))
  src.addEventListener('delete', handleMessage(opt, dispatch, handleDelete))
}
